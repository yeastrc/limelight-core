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
package org.yeastrc.limelight.limelight_feature_detection_run_import.program;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.Date;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_feature_detection_run_import.config.GetFeatureDetectionConfigFromConfigTable;
import org.yeastrc.limelight.limelight_feature_detection_run_import.constants.ImporterProgramExitCodes;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterProjectNotAllowImportException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporter_PipelineRunErrorResult_Exception;
import org.yeastrc.limelight.limelight_feature_detection_run_import.objects.ImportResults;
import org.yeastrc.limelight.limelight_feature_detection_run_import.process_file_import_submission.ProcessFileImportSubmission;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_and_import__import__core_entry_points.Import_CoreEntryPoint;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_and_import__import__core_entry_points.Run_And_Import_CoreEntryPoint;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.database_schema_version__constant.LimelightDatabaseSchemaVersion_Constants;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingRun_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dao.FileImportAndPipelineRunTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_SubStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.objects.FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.constants.RunImporterToImporterParameterNamesConstants;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare.Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderPropertiesFileContentsErrorException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderPropertiesFileErrorException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.database_update_with_transaction_services.Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction;

import jargs.gnu.CmdLineParser;
import jargs.gnu.CmdLineParser.IllegalOptionValueException;
import jargs.gnu.CmdLineParser.UnknownOptionException;

/**
 * Program Entry Point
 *
 */
public class Limelight_FeatureDetection_Run_Import_Program {

	private static final Logger log = LoggerFactory.getLogger( Limelight_FeatureDetection_Run_Import_Program.class );

	private static final String FOR_HELP_STRING = "For help, run without any parameters, -h, or --help";
	
	private static final String HELP_FILE_WITH_PATH = "/help_output_import_xml.txt";
	
	
	
	private static Integer fileImportRunIdToProcess_StaticProperty = null;
	

	/**
	 * private constructor
	 */
	private Limelight_FeatureDetection_Run_Import_Program() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_FeatureDetection_Run_Import_Program _instance = new Limelight_FeatureDetection_Run_Import_Program();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_FeatureDetection_Run_Import_Program getSingletonInstance() {
		return _instance; 
	}
	
	/**
	 * The importer process received a TERM or other signal that triggered the thread
	 * registered in the shutdown hook to run
	 */
	private volatile boolean shutdownReceivedViaShutdownHook = false;
	
	private volatile Import_CoreEntryPoint import_CoreEntryPoint;
	private volatile Run_And_Import_CoreEntryPoint run_And_Import_CoreEntryPoint;
	
	/**
	 * If set to false, assume it is already created
	 */
	private boolean createDatabaseConnectionFactory = true;
	public void databaseConnectionFactoryAlreadyCreated() {
		createDatabaseConnectionFactory = false;
		//		databaseConnectionFactoryCreated = true;
	}
	
	/**
	 * @param args
	 * @throws Exception 
	 */
	public static void main(String[] args) throws Exception {
		
		if ( args.length == 0 ) {
			System.out.println( "NO Command Line Arguments");
		} else {
			System.out.println( "Command Line Arguments List START:" );
			for ( String arg : args ) {
				System.out.println( arg );
			}
			System.out.println( "Command Line Arguments List END:" );
		}
		
		Limelight_FeatureDetection_Run_Import_Program limelightImporterProgram = new Limelight_FeatureDetection_Run_Import_Program();
		limelightImporterProgram.mainNotStaticInternal( args );
		
	}
	
	/**
	 * Main Entry point once instantiate object of this class
	 * 
	 * @param args
	 * @throws Exception 
	 */
	private void mainNotStaticInternal( String[] args  ) throws Exception {
		
		ImportResults importResults = importerDefaultMainProgramEntry( args );

		if ( shutdownReceivedViaShutdownHook 
				&& importResults.getProgramExitCode() != ImporterProgramExitCodes.PROGRAM_EXIT_CODE_DEFAULT_NO_ERRORS_OR_WARNINGS ) {
			//  Override the error code since forced by processing shutdown request on shutdown hook
			System.exit( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_SHUTDOWN_REQUESTED_USING_PROCESS_TERM );
		}
		
		System.exit( importResults.getProgramExitCode() );
	}

	/**
	 * @param args
	 * @return ImportResults
	 * @throws Exception 
	 */
	public ImportResults importerDefaultMainProgramEntry( String[] args  ) throws Exception {
		
		return importerDefaultMainProgramEntryPassingArgsAndLimelightXMLObject( args );
	}
	
	/**
	 * @param args
	 * @return ImportResults
	 * @throws Exception 
	 */
	public ImportResults importerDefaultMainProgramEntryPassingArgsAndLimelightXMLObject( 
			String[] args
			) throws Exception {
		
		ImportResults importResults = new ImportResults();

		//  Default ProgramExitCode to PROGRAM_EXIT_CODE_DEFAULT_NO_ERRORS_OR_WARNINGS
		//  Update ProgramExitCode below if need to use other exit code
		importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_DEFAULT_NO_ERRORS_OR_WARNINGS );
		

		boolean successfulImport = false;
				
		//  Populated in ProcessFileImportSubmission when processing a Import Submission
		FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair = new FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair();
		
		ImportProgramShutdownThread importProgramShutdownThread = null;
		
		try {
			if ( args.length == 0 ) {
				printHelp();
				importResults.setImportSuccessStatus(false);
				importResults.setHelpRequestedStatus(true);
				importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_HELP );
				return importResults;  //  EARLY EXIT
			}
			
			CmdLineParser cmdLineParser = new CmdLineParser();
			
			CmdLineParser.Option dbConfigFileNameCommandLineOpt = cmdLineParser.addStringOption( 'c', "config" );
			
			//  'Z' is arbitrary and won't be suggested to user
			CmdLineParser.Option fileImportRunIdToProcessOpt = cmdLineParser.addStringOption( 'Z', RunImporterToImporterParameterNamesConstants.RUN_IMPORTER_PARAMS_RUN_ID );

			CmdLineParser.Option helpOpt = cmdLineParser.addBooleanOption('h', "help"); 
			// parse command line options
			try { cmdLineParser.parse(args); }
			catch (IllegalOptionValueException e) {
//				System.err.println( "IllegalOptionValueException");
				System.err.println(e.getMessage());
				System.err.println( "" );
				System.err.println( FOR_HELP_STRING );
				importResults.setImportSuccessStatus( false) ;
				importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
				return importResults;  //  EARLY EXIT
			}
			catch (UnknownOptionException e) {
//				System.err.println( "UnknownOptionException");
				System.err.println(e.getMessage());
				System.err.println( "" );
				System.err.println( FOR_HELP_STRING );
				importResults.setImportSuccessStatus( false) ;
				importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
				return importResults;  //  EARLY EXIT
			}
			Boolean help = (Boolean) cmdLineParser.getOptionValue(helpOpt, Boolean.FALSE);
			if(help) {
				printHelp();
				importResults.setImportSuccessStatus( false) ;
				importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_HELP );
				return importResults;  //  EARLY EXIT
			}
			//  Show an error if there is anything on the command line not associated with a parameter
			String[] remainingArgs = cmdLineParser.getRemainingArgs();
			if( remainingArgs.length > 0 ) {
				System.out.println( "Unexpected command line parameters:");
				for ( String remainingArg : remainingArgs ) {
					System.out.println( remainingArg );
				}
				System.err.println( "" );
				System.err.println( FOR_HELP_STRING );
				importResults.setImportSuccessStatus( false) ;
				importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
				return importResults;  //  EARLY EXIT
			}
			
			Integer fileImportRunIdToProcess = null;
			
			File configFile = null;
			
			//  values from command line
			
			String configFileName = (String)cmdLineParser.getOptionValue( dbConfigFileNameCommandLineOpt );
			
			if ( StringUtils.isEmpty( configFileName ) ) {
				System.err.println( "No value for Config file.");
				System.err.println( "" );
				System.err.println( FOR_HELP_STRING );
				importResults.setImportSuccessStatus( false) ;
				importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
				return importResults;  //  EARLY EXIT
			}

//			if ( StringUtils.isNotEmpty( configFileName ) ) {
			configFile = new File( configFileName );
			if( ! configFile.exists() ) {
				System.err.println( "Could not find Config File: " + configFile.getAbsolutePath() );
				System.err.println( "" );
				System.err.println( FOR_HELP_STRING );
				importResults.setImportSuccessStatus( false) ;
				importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
				return importResults;  //  EARLY EXIT
			}
//			}

			
			//  Specific value from "Run Importer" Program
			String fileImportRunIdToProcessString = (String)cmdLineParser.getOptionValue( fileImportRunIdToProcessOpt );
			
			if ( StringUtils.isNotEmpty( fileImportRunIdToProcessString ) ) {
				try {
					fileImportRunIdToProcess = Integer.parseInt( fileImportRunIdToProcessString );
					
					Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty = fileImportRunIdToProcess;
					
				} catch ( Exception e ) {
					System.err.println( "parameter --'" 
							+ RunImporterToImporterParameterNamesConstants.RUN_IMPORTER_PARAMS_RUN_ID
							+ "' must be an integer.  Value passed: " + fileImportRunIdToProcessString );
					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );
					importResults.setImportSuccessStatus( false) ;
					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
					return importResults;  //  EARLY EXIT
				}
			
			} else {
				System.err.println( "parameter --'" 
						+ RunImporterToImporterParameterNamesConstants.RUN_IMPORTER_PARAMS_RUN_ID
						+ "' is REQUIRED." );
			}
			
			
			if ( log.isInfoEnabled() ) {
				System.out.println( "Now: " + new Date() );
				System.out.println( "" );
			}
			
			
			//   add a shutdown hook that will be called either when the operating system sends a SIGKILL signal on Unix or all threads terminate ( normal exit )
			//           Also called when ctrl-c is pressed on Unix or Windows
			//  public void addShutdownHook(Thread hook)
			Thread mainThread = Thread.currentThread();
			importProgramShutdownThread = new ImportProgramShutdownThread();
			importProgramShutdownThread.setMainThread( mainThread );
			Runtime runtime = Runtime.getRuntime();
			runtime.addShutdownHook( importProgramShutdownThread );

			if ( createDatabaseConnectionFactory ) {
				DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables dbConnectionParametersProvider = new DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables();
				if ( configFile != null ) {
					dbConnectionParametersProvider.setConfigFile( configFile );
				}
				try {
					dbConnectionParametersProvider.init();
				} catch ( DBConnectionParametersProviderPropertiesFileErrorException e ) {
					importResults.setImportSuccessStatus( false) ;
					if ( configFile != null ) {
						importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
					} else {
						importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_CONFIGURATION_PARAMETER_VALUES );
					}
					return importResults;  //  EARLY EXIT
				} catch ( DBConnectionParametersProviderPropertiesFileContentsErrorException e ) {
					importResults.setImportSuccessStatus( false) ;
					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_CONFIGURATION_PARAMETER_VALUES );
					return importResults;  //  EARLY EXIT
				} catch ( Exception e ) {
					System.err.println( "Failed processing DB config file." );
					importResults.setImportSuccessStatus( false) ;
					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_SYSTEM_ERROR );
					return importResults;  //  EARLY EXIT
				}
				ImportRunImporterDBConnectionFactory importDBConnectionFactory = ImportRunImporterDBConnectionFactory.getMainSingletonInstance();
				importDBConnectionFactory.initialize( dbConnectionParametersProvider );
				
				SharedCodeOnly_DBConnectionProvider.setSharedCodeOnly_DBConnectionProvider_Provider_IF( importDBConnectionFactory );

				ConfigSystemDAO_Importer configSystemDAO = ConfigSystemDAO_Importer.getInstance();
				ConfigSystemTableGetValueCommon.getInstance().setIConfigSystemTableGetValue( configSystemDAO );
			}
			
			
			if ( ! GetFeatureDetectionConfigFromConfigTable.fullyConfigured_FeatureDetection() ) {

				System.err.println( "DB config table is NOT fully configured for running Feature Detection - run Hardklor/Bullseye." );
				importResults.setImportSuccessStatus( false) ;
				importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_CONFIGURATION_PARAMETER_VALUES );
				return importResults;  //  EARLY EXIT
			}

			{ //  Validate Code And Database Schema Versions match
				
				//  CURRENT Version
				LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabase_CURRENT_SchemaVersion_Comparison_Result =
						Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance().
						getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result(
								Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.Log_Exception_YN.YES
								);

				//  DB Update in Progress Version
				LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result =
						Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance().
						getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result(
								Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.Log_Exception_YN.YES
								);
				
				if ( limelightDatabase_CURRENT_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME
						|| limelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {
					
					//  Code And Database Schema Version do NOT match
					
					String errorMessage = null;
					
					if ( limelightDatabase_CURRENT_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

						//  CURRENT version mismatch

						if ( limelightDatabase_CURRENT_SchemaVersion_Comparison_Result == LimelightDatabaseSchemaVersion_Comparison_Result.CODE_GREATER_THAN_DATABASE ) {

							errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_CURRENT_VERSION__CODE_GREATER_THAN_DATABASE__IMPORTER__ERROR_MESSAGE;

						} else {

							errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_CURRENT_VERSION__CODE_LESS_THAN_DATABASE__IMPORTER__ERROR_MESSAGE;
						}
					} else {
						
						errorMessage = LimelightDatabaseSchemaVersion_Constants.DATABASE_UPGRADE_IN_PROGRESS_VERSION__MISMATCH_VERSION_NUMBERS__ERROR_MESSAGE;
					}

					System.out.println();
					System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
					System.out.println();

					System.out.println( "ERROR: Unable to perform Import.");

					System.out.println( errorMessage );
					
					System.out.println();
					System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
					System.out.println();

					System.err.println();
					System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
					System.err.println();

					System.err.println( "ERROR: Unable to perform Import.");

					System.err.println( errorMessage );
					
					System.err.println();
					System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
					System.err.println();

					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );
					
					
					if ( fileImportRunIdToProcess != null ) {
						
						//  Have Submitted Import

						//  Add Error message to Submitted Import to make visible in the web app

						FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO =
								FileImportAndPipelineRunTrackingRun_Shared_Get_DAO.getInstance()
								.getItem( fileImportRunIdToProcess );

						if ( fileImportAndPipelineRunTrackingRunDTO == null ) {
							final String msg = "No FileImportTrackingRunDTO Record found for fileImportRunIdToProcess: " + fileImportRunIdToProcess;
							System.err.println( msg );
						} else {

							FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO =
									FileImportAndPipelineRunTracking_Shared_Get_DAO.getInstance()
									.getItem( fileImportAndPipelineRunTrackingRunDTO.getFileImportAndPipelineRunTracking_Id() );

							if ( fileImportAndPipelineRunTrackingDTO == null ) {
								final String msg = "No fileImportAndPipelineRunTrackingDTO Record found for fileImportRunIdToProcess: " + fileImportRunIdToProcess
										+ ", fileImportAndPipelineRunTrackingDTO record id: " + fileImportAndPipelineRunTrackingRunDTO.getFileImportAndPipelineRunTracking_Id();
								System.err.println( msg );
							} else {
								
								System.out.println( "Updating Submitted Import. Set to Failed and with Error Message: " + errorMessage );

								fileImportAndPipelineRunTrackingRunDTO.setStatus( FileImportStatus.FAILED );
								fileImportAndPipelineRunTrackingRunDTO.setSubStatus( FileImportAndPipelineRun_SubStatus.SYSTEM_ERROR );
								fileImportAndPipelineRunTrackingRunDTO.setFinished_fail_end_user_display_message(errorMessage);
								
								Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
								.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
										FileImportStatus.FAILED, 
										fileImportAndPipelineRunTrackingDTO.getId(), 
										fileImportAndPipelineRunTrackingRunDTO );
							}
						}
					}
					
					importResults.setImportSuccessStatus( false) ;
					
					//  Set Specific program exit code
					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_IMPORTER_DATABASE_SCHEMA_VERSION_NUMBER_NOT_MATCH_DATABASE_DATABASE_SCHEMA_VERSION_NUMBER );
					
					return importResults;  //  EARLY EXIT
				}
			}
			
			
			//////////////////////////////////////
			//////////   Do the import
			
			import_CoreEntryPoint = Import_CoreEntryPoint.getInstance();
			
			run_And_Import_CoreEntryPoint = Run_And_Import_CoreEntryPoint.getInstance();
			
			ProcessFileImportSubmission.getInstance()
			.processFileImportSubmission(
					fileImportRunIdToProcess, trackingDTOTrackingRunDTOPair, import_CoreEntryPoint, run_And_Import_CoreEntryPoint
					);

			successfulImport = true;
			importProgramShutdownThread.setNormalProgramCompletionReached( true );
			
			//  Update records for submitted by web app
			if ( trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO() != null && trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO() != null ) {
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setStatus( FileImportStatus.COMPLETE );
				
				Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.COMPLETE, 
						trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO().getId(), 
						trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO() );
			}

		} catch ( LimelightImporterProjectNotAllowImportException e ) {
			// TODO
//			if ( outputDataErrorsFileName != null ) {
//				writeDataErrorToFile( 
//						"The upload can no longer be inserted into this project." + e.getMessage(), 
//						e, outputDataErrorsFileName );
//			}
			importResults.setImportSuccessStatus( false) ;
			importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_PROJECT_NOT_ALLOW_IMPORT );
			

			if ( trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO() != null && trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO() != null ) {
				
				String dataErrorText = "The upload can no longer be inserted into this project.";
				
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setStatus( FileImportStatus.FAILED );
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setSubStatus( FileImportAndPipelineRun_SubStatus.PROJECT_NOT_ALLOW_IMPORT );
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setFinished_fail_end_user_display_message( dataErrorText );
				
				Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.FAILED, 
						trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO().getId(), 
						trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO() );
			}

			return importResults;  //  EARLY EXIT
			
		} catch ( LimelightImporter_PipelineRunErrorResult_Exception e ) {

			//  Run Pipeline returned status 'error' and this Exception message is the returned error_message
			
			log.error( "Caught LimelightImporter_PipelineRunErrorResult_Exception: " + e.getMessage(), e );
//			if ( outputDataErrorsFileName != null ) {
//				writeDataErrorToFile( exception.getMessage(), exception, outputDataErrorsFileName );
//			}
			importResults.setImportSuccessStatus( false) ;
			importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_DATA_ERROR );

			if ( trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO() != null && trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO() != null ) {
				
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setStatus( FileImportStatus.FAILED );
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setSubStatus( FileImportAndPipelineRun_SubStatus.PIPELINE_RUN_ERROR );
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setFinished_fail_pipeline_end_user_display_message( e.getMessage() );
				
				Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.FAILED, 
						trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO().getId(), 
						trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO() );
			}

			return importResults;  //  EARLY EXIT
			
		} catch ( LimelightImporterDataException e) {
			log.error( "Caught LimelightImporterDataException: " + e.getMessage(), e );
//			if ( outputDataErrorsFileName != null ) {
//				writeDataErrorToFile( exception.getMessage(), exception, outputDataErrorsFileName );
//			}
			importResults.setImportSuccessStatus( false) ;
			importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_DATA_ERROR );
						
			//  Update records for import submitted by web app

			if ( trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO() != null && trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO() != null ) {
				
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setStatus( FileImportStatus.FAILED );
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setSubStatus( FileImportAndPipelineRun_SubStatus.DATA_ERROR );
				trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO().setFinished_fail_end_user_display_message( e.getMessage() );
				
				Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.FAILED, 
						trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingDTO().getId(), 
						trackingDTOTrackingRunDTOPair.getFileImportAndPipelineRunTrackingRunDTO() );
			}

			return importResults;  //  EARLY EXIT
			
		} catch ( Throwable e ) {
			if ( ! shutdownReceivedViaShutdownHook ) {
				System.out.println( "Exception in processing" );
				System.err.println( "Exception in processing" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
			}
			throw e;
	
		} finally {
			if ( importProgramShutdownThread != null ) {
				importProgramShutdownThread.setNormalProgramCompletionReached( true );
			}
			if ( log.isDebugEnabled() ) {
				log.debug( "Main Thread:  Calling ImportDBConnectionFactory.getInstance().closeAllConnections(); on main thread.");
			}
			try {
				// free up our db resources
				ImportRunImporterDBConnectionFactory.getMainSingletonInstance().closeAllConnections();
				if ( log.isDebugEnabled() ) {
					log.debug( "Main Thread:  Call to ImportDBConnectionFactory.getInstance().closeAllConnections(); on main thread Completed.");
				}
			} catch ( Exception e ) {
				System.out.println( "----------------------------------------");
				System.out.println( "----");
				System.err.println( "----------------------------------------");
				System.err.println( "----");
				System.out.println( "Main Thread:  Exception in closing database connections" );
				System.err.println( "Main Thread:  Exception in closing database connections" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
				System.out.println( "----");
				System.out.println( "----------------------------------------");
				System.err.println( "----");
				System.err.println( "----------------------------------------");
				throw e;
			}
		}
		
		return importResults;
	}
	
	

	/**
	 *
	 *  Class for processing kill signal. This is also run when all the threads in the application die/exit run()
	 */
	public static class ImportProgramShutdownThread extends Thread {
		
		private static final Logger logImportProgramShutdownThread = LoggerFactory.getLogger( ImportProgramShutdownThread.class ); 
		private final static int WAIT_TIME_FOR_MAIN_THREAD_TO_EXIT_IF_NORMAL_COMPLETION_REACHED = 2 * 1000; // 2 seconds
		private volatile Thread mainThread;
		private volatile boolean normalProgramCompletionReached = false;
		
		/*
		 * method that will run when kill signal is received
		 */
		@Override
		public void run() {
			Thread thisThread = Thread.currentThread();
			thisThread.setName( "Thread-Process-Shutdown-Request" );
			if ( normalProgramCompletionReached ) {
				//  Main thread is about to exit normally so wait for it to exit normally
				try {
					mainThread.join( WAIT_TIME_FOR_MAIN_THREAD_TO_EXIT_IF_NORMAL_COMPLETION_REACHED );
				} catch (InterruptedException e) {
					String msg = "Wait for main thread to exit was interrupted.  allowing process to exit";
					log.error( msg );
				}
				return;  //  EARLY EXIT
			}
			if ( logImportProgramShutdownThread.isDebugEnabled() ) {
				logImportProgramShutdownThread.debug( "ImportProgramShutdownThread::run() called now(): " + new Date());
			}
			Limelight_FeatureDetection_Run_Import_Program.getSingletonInstance().shutdownReceivedViaShutdownHook = true;
			
			try {
				Limelight_FeatureDetection_Run_Import_Program.getSingletonInstance().import_CoreEntryPoint.setShutdownRequested(true);
			} catch ( Exception e ) {
				//  Eat this exception since may be null pointer exception or other exception
			}
			try {
				Limelight_FeatureDetection_Run_Import_Program.getSingletonInstance().run_And_Import_CoreEntryPoint.setShutdownRequested(true);
			} catch ( Exception e ) {
				//  Eat this exception since may be null pointer exception or other exception
			}
			if ( logImportProgramShutdownThread.isDebugEnabled() ) {
				logImportProgramShutdownThread.debug( "Calling ImportDBConnectionFactory.closeAllConnections(); on shutdown thread to ensure connections closed.");
			}
			
			System.out.println( "Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty: " + Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty );
			 
			if ( Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty != null ) {
				
				System.out.println( "Processing Run Id so reset to 'RE_QEUEUD'.  Run Id: " + Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty );

				try {
					FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO =
							FileImportAndPipelineRunTrackingRun_Shared_Get_DAO.getInstance()
							.getItem( Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty.intValue() );

//					System.out.println( "OLD: fileImportAndPipelineRunTrackingRunDTO: " + fileImportAndPipelineRunTrackingRunDTO );
					
					if ( fileImportAndPipelineRunTrackingRunDTO == null ) {
						final String msg = "No FileImportTrackingRunDTO Record found for Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty: " + Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty.intValue();
						System.err.println( msg );
					} else {
						fileImportAndPipelineRunTrackingRunDTO.setStatus( FileImportStatus.RE_QUEUED );
						
//						{
//
//							FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO =
//									FileImportAndPipelineRunTracking_Shared_Get_DAO.getInstance()
//									.getItem( fileImportAndPipelineRunTrackingRunDTO.getFileImportAndPipelineRunTracking_Id() );
//
//							System.out.println( "OLD: fileImportAndPipelineRunTrackingDTO: " + fileImportAndPipelineRunTrackingDTO );
//						}

						Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.getInstance()
						.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
								FileImportStatus.RE_QUEUED, 
								fileImportAndPipelineRunTrackingRunDTO.getFileImportAndPipelineRunTracking_Id(), 
								fileImportAndPipelineRunTrackingRunDTO );
					}
				
				} catch (Exception e ) {
					
					String msg = "Failed to update run id to requeud due to exception. run id: " + Limelight_FeatureDetection_Run_Import_Program.fileImportRunIdToProcess_StaticProperty;
					
					log.error( msg, e );
					
					System.out.println( msg );
					System.err.println( msg );
					e.printStackTrace();
				}
			}
			
			{
				String msg = "Program termination has been requested.  Closing database connections.";
				System.out.println( msg );
				System.err.println( msg );
			}
			//  Ensure database connections get closed before program dies.
			try {
				// free up our db resources
				ImportRunImporterDBConnectionFactory.getMainSingletonInstance().closeAllConnections();
				if ( logImportProgramShutdownThread.isDebugEnabled() ) {
					logImportProgramShutdownThread.debug( "COMPLETE:  Calling ImportDBConnectionFactory.closeAllConnections(); on shutdown thread to ensure connections closed.");
				}
			} catch ( Exception e ) {
				System.out.println( "----------------------------------------");
				System.out.println( "----");
				System.err.println( "----------------------------------------");
				System.err.println( "----");
				System.out.println( "Shutdown Thread: Exception in closing database connections  on shutdown thread" );
				System.err.println( "Shutdown Thread: Exception in closing database connections  on shutdown thread" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
				System.out.println( "----");
				System.out.println( "----------------------------------------");
				System.err.println( "----");
				System.err.println( "----------------------------------------");
			}
			{
				String msg = "Program termination has been requested.  Hardklor and Bullseye files have not been fully imported.  Database connections have been closed."
						+ "  Program exiting";
				System.out.println( msg );
				System.err.println( msg );
			}
			if ( logImportProgramShutdownThread.isDebugEnabled() ) {
				logImportProgramShutdownThread.debug( "ImportProgramShutdownThread::run() exiting now(): " + new Date() );
			}
		}
		
		public Thread getMainThread() {
			return mainThread;
		}
		public void setMainThread(Thread mainThread) {
			this.mainThread = mainThread;
		}
		public boolean isNormalProgramCompletionReached() {
			return normalProgramCompletionReached;
		}
		public void setNormalProgramCompletionReached(
				boolean normalProgramCompletionReached) {
			this.normalProgramCompletionReached = normalProgramCompletionReached;
		}
	}
	
	/**
	 * @throws Exception
	 */
	private static void printHelp() throws Exception {
		try( BufferedReader
				br = 
				new BufferedReader(
						new InputStreamReader( 
								Limelight_FeatureDetection_Run_Import_Program.class
								.getResourceAsStream( HELP_FILE_WITH_PATH ) ) ) ) {
			String line = null;
			while ( ( line = br.readLine() ) != null )
				System.out.println( line );				
		} catch ( Exception e ) {
			System.out.println( "Error printing help." );
		}
	}

}
