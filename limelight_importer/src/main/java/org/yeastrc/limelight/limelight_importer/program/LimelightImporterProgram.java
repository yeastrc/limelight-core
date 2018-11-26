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
package org.yeastrc.limelight.limelight_importer.program;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_importer.constants.ImporterProgramExitCodes;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterLimelightXMLDeserializeFailException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterProjectNotAllowImportException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_importer.importer_core_entry_point.ImporterCoreEntryPoint;
import org.yeastrc.limelight.limelight_importer.objects.ImportResults;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.process_file_import_submission.ProcessFileImportSubmission;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ValidateScanFileSuffix;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportRunSubStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.constants.RunImporterToImporterParameterNamesConstants;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderFromPropertiesFile;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderPropertiesFileContentsErrorException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderPropertiesFileErrorException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.dao.FileImportTrackingRun_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.database_update_with_transaction_services.UpdateTrackingTrackingRunRecordsDBTransaction;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.objects.TrackingDTOTrackingRunDTOPair;

import jargs.gnu.CmdLineParser;
import jargs.gnu.CmdLineParser.IllegalOptionValueException;
import jargs.gnu.CmdLineParser.UnknownOptionException;

/**
 * Program Entry Point
 *
 */
public class LimelightImporterProgram {

	private static final Logger log = LoggerFactory.getLogger( LimelightImporterProgram.class );

	private static final String FOR_HELP_STRING = "For help, run without any parameters, -h, or --help";
	
	private static final String HELP_FILE_WITH_PATH = "/help_output_import_xml.txt";

	public static final String SKIP_POPULATING_PATH_ON_SEARCH_CMD_LINE_PARAM_STRING = "skip_populating_path_on_search";

	/**
	 * private constructor
	 */
	private LimelightImporterProgram() { }
	/**
	 * Static singleton instance
	 */
	private static final LimelightImporterProgram _instance = new LimelightImporterProgram();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static LimelightImporterProgram getSingletonInstance() {
		return _instance; 
	}
	
	/**
	 * The importer process received a TERM or other signal that triggered the thread
	 * registered in the shutdown hook to run
	 */
	private volatile boolean shutdownReceivedViaShutdownHook = false;
	private volatile ImporterCoreEntryPoint importerCoreEntryPoint;
	
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
		
		LimelightImporterProgram limelightImporterProgram = new LimelightImporterProgram();
		limelightImporterProgram.mainNotStaticInternal( args );
		
	}
	
	/**
	 * @param args
	 * @return insertedSearchId
	 * @throws Exception 
	 */
	private void mainNotStaticInternal( String[] args  ) throws Exception {
//		System.out.println( "Enter mainNotStaticInternal:");
		ImportResults importResults = importerDefaultMainProgramEntry( args );
//		System.out.println( "mainNotStaticInternal after call importerDefaultMainProgramEntry: importResults.getProgramExitCode() :" + importResults.getProgramExitCode() );
		if ( shutdownReceivedViaShutdownHook 
				&& importResults.getProgramExitCode() != ImporterProgramExitCodes.PROGRAM_EXIT_CODE_DEFAULT_NO_ERRORS_OR_WARNINGS ) {
			//  Override the error code since forced by processing shutdown request on shutdown hook
			System.exit( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_SHUTDOWN_REQUESTED_USING_PROCESS_TERM );
		}
		System.exit( importResults.getProgramExitCode() );
	}

	/**
	 * @param args
	 * @return insertedSearchId
	 * @throws Exception 
	 */
	public ImportResults importerDefaultMainProgramEntry( String[] args  ) throws Exception {
		LimelightInput limelightInputForImportParam = null;
		return importerDefaultMainProgramEntryPassingArgsAndLimelightXMLObject( args, limelightInputForImportParam );
	}
	
	/**
	 * @param args
	 * @return insertedSearchId
	 * @throws Exception 
	 */
	public ImportResults importerDefaultMainProgramEntryPassingArgsAndLimelightXMLObject( 
			String[] args, 
			LimelightInput limelightInputForImportParam
			) throws Exception {
		
		ImportResults importResults = new ImportResults();

		//  Default ProgramExitCode to PROGRAM_EXIT_CODE_DEFAULT_NO_ERRORS_OR_WARNINGS
		//  Update ProgramExitCode below if need to use other exit code
		importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_DEFAULT_NO_ERRORS_OR_WARNINGS );
		

		boolean successfulImport = false;
		
		//  Search Name from fileImportTrackingDTO or command Line
		String searchNameOverrideValue = null;
		//  "search_path" field from "file_import_tracking" table, if import run from Run Import pgm
		String importDirectoryOverrideValue = null;
		
		//  TODO  Not currently used
//		String outputImportResultFileName = null;
		
		//  Populated in ProcessFileImportSubmission when processing a Import Submission
		TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair = new TrackingDTOTrackingRunDTOPair();
		
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
			CmdLineParser.Option projectIdOpt = cmdLineParser.addIntegerOption( 'p', "project-id" );	
			CmdLineParser.Option inputMainFileStringCommandLineOpt = cmdLineParser.addStringOption( 'i', "import-file" );
			CmdLineParser.Option noScanFilesCommandLineOpt = cmdLineParser.addBooleanOption( 'n', "no-scan-files" );
			CmdLineParser.Option inputScanFileStringCommandLineOpt = cmdLineParser.addStringOption( 's', "scan-file" );
			CmdLineParser.Option dbConfigFileNameCommandLineOpt = cmdLineParser.addStringOption( 'c', "config" );
			//  'Z' is arbitrary and won't be suggested to user
			CmdLineParser.Option skipSearchNameOverrideOpt = cmdLineParser.addStringOption( 'Z', "search-name" );
			//  'Z' is arbitrary and won't be suggested to user
			CmdLineParser.Option skipPopulatingPathOnSearchLineOpt = cmdLineParser.addBooleanOption( 'Z', SKIP_POPULATING_PATH_ON_SEARCH_CMD_LINE_PARAM_STRING );

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
			
			Integer projectId = null;
			Boolean noScanFilesCommandLineOptChosen = null;
			Map<String,ScanFileFileContainer> scanFileFileContainer_KeyFilename = null;
			
			File mainXMLFileToImport = null;
			List<File> scanFileList = null;

			File dbConfigFile = null;
			
			Boolean skipPopulatingPathOnSearchLineOptChosen = null;

			//  values from command line
			
			String dbConfigFileName = (String)cmdLineParser.getOptionValue( dbConfigFileNameCommandLineOpt );

			if ( StringUtils.isNotEmpty( dbConfigFileName ) ) {
				dbConfigFile = new File( dbConfigFileName );
				if( ! dbConfigFile.exists() ) {
					System.err.println( "Could not find DB Config File: " + dbConfigFile.getAbsolutePath() );
					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );
					importResults.setImportSuccessStatus( false) ;
					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
					return importResults;  //  EARLY EXIT
				}
			}			

			
			//  Specific value from "Run Importer" Program
			String fileImportRunIdToProcessString = (String)cmdLineParser.getOptionValue( fileImportRunIdToProcessOpt );
			
			if ( StringUtils.isNotEmpty( fileImportRunIdToProcessString ) ) {
				try {
					fileImportRunIdToProcess = Integer.parseInt( fileImportRunIdToProcessString );
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


				projectId = (Integer)cmdLineParser.getOptionValue( projectIdOpt );
				String inputLimelightFileString = (String)cmdLineParser.getOptionValue( inputMainFileStringCommandLineOpt );
				noScanFilesCommandLineOptChosen = (Boolean) cmdLineParser.getOptionValue( noScanFilesCommandLineOpt, Boolean.FALSE);
				@SuppressWarnings("rawtypes")
				Vector inputScanFileStringVector = cmdLineParser.getOptionValues( inputScanFileStringCommandLineOpt );
				String searchNameOverrideValueFromCommandLine = (String)cmdLineParser.getOptionValue( skipSearchNameOverrideOpt );

				skipPopulatingPathOnSearchLineOptChosen = (Boolean) cmdLineParser.getOptionValue( skipPopulatingPathOnSearchLineOpt, Boolean.FALSE);

				if ( StringUtils.isNotEmpty( searchNameOverrideValueFromCommandLine ) ) {
					searchNameOverrideValue = searchNameOverrideValueFromCommandLine;
				}

				if( ( noScanFilesCommandLineOptChosen == null || ( ! noScanFilesCommandLineOptChosen ) )
						&& ( inputScanFileStringVector == null || ( inputScanFileStringVector.isEmpty() ) ) ) {
					System.err.println( "At least one scan file is required since 'no scan files' param ('-n' or '--no-scan-files') not specified.\n" );
					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );
					importResults.setImportSuccessStatus( false) ;
					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
					return importResults;  //  EARLY EXIT
				}
				if( projectId == null || projectId == 0 ) {
					System.err.println( "Must specify a project id using -p\n" );
					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );
					importResults.setImportSuccessStatus( false) ;
					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
					return importResults;  //  EARLY EXIT
				}
				mainXMLFileToImport = new File( inputLimelightFileString );
				importResults.setImportedLimelightXMLFile( mainXMLFileToImport );
				if( ! mainXMLFileToImport.exists() ) {
					System.err.println( "Could not find main XML File To Import file: " + mainXMLFileToImport.getAbsolutePath() );
					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );
					importResults.setImportSuccessStatus( false) ;
					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
					return importResults;  //  EARLY EXIT
				}

				//  Process scan files

				if ( inputScanFileStringVector != null && ( ! inputScanFileStringVector.isEmpty() ) ) {

					scanFileFileContainer_KeyFilename = new HashMap<>();

					//  For return result
					scanFileList = new ArrayList<>( inputScanFileStringVector.size() );

					for ( Object inputScanFileStringObject : inputScanFileStringVector ) {
						if ( ! (  inputScanFileStringObject instanceof String ) ) {
							System.err.println( "Internal ERROR:  inputScanFileStringObject is not a String object." );
							System.err.println( "" );
							System.err.println( FOR_HELP_STRING );
							importResults.setImportSuccessStatus( false) ;
							importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
							return importResults;  //  EARLY EXIT
						}

						String inputScanFileString = (String) inputScanFileStringObject;
						if( inputScanFileString == null || inputScanFileString.equals( "" ) ) {
							System.err.println( "Internal ERROR:  inputScanFileStringObject is empty or null." );
							System.err.println( "" );
							System.err.println( FOR_HELP_STRING );
							importResults.setImportSuccessStatus( false) ;
							importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
							return importResults;  //  EARLY EXIT
						}

						String errorStringScanSuffixValidation = 
								ValidateScanFileSuffix.getInstance().validateScanFileSuffix( inputScanFileString );
						if ( errorStringScanSuffixValidation != null ) {
							System.err.println( errorStringScanSuffixValidation );
							System.err.println( "" );
							System.err.println( FOR_HELP_STRING );
							importResults.setImportSuccessStatus( false) ;
							importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
							return importResults;  //  EARLY EXIT
						}

						File scanFile = new File( inputScanFileString );
						if( ! scanFile.exists() ) {
							System.err.println( "Could not find scan file: " + scanFile.getAbsolutePath() );
							System.err.println( "" );
							System.err.println( FOR_HELP_STRING );
							importResults.setImportSuccessStatus( false) ;
							importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
							return importResults;  //  EARLY EXIT
						}

						scanFileList.add( scanFile );

						String scanFilename = scanFile.getName();

						if ( scanFileFileContainer_KeyFilename.containsKey( scanFilename ) ) {
							System.err.println( "scan filename listed more than once: " + scanFilename );
							System.err.println( "" );
							System.err.println( FOR_HELP_STRING );
							importResults.setImportSuccessStatus( false) ;
							importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
							return importResults;  //  EARLY EXIT
						}

						ScanFileFileContainer scanFileFileContainer = new ScanFileFileContainer();
						scanFileFileContainer.setScanFile( scanFile );
						scanFileFileContainer.setScanFilename( scanFilename );

						scanFileFileContainer_KeyFilename.put( scanFilename, scanFileFileContainer );

					}
				}
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
				DBConnectionParametersProviderFromPropertiesFile dbConnectionParametersProvider = new DBConnectionParametersProviderFromPropertiesFile();
				if ( dbConfigFile != null ) {
					dbConnectionParametersProvider.setConfigFile( dbConfigFile );
				}
				try {
					dbConnectionParametersProvider.init();
				} catch ( DBConnectionParametersProviderPropertiesFileErrorException e ) {
					importResults.setImportSuccessStatus( false) ;
					if ( dbConfigFile != null ) {
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
				ImportRunImporterDBConnectionFactory importDBConnectionFactory = ImportRunImporterDBConnectionFactory.getInstance();
				importDBConnectionFactory.initialize( dbConnectionParametersProvider );
				
				SharedCodeOnly_DBConnectionProvider.setSharedCodeOnly_DBConnectionProvider_Provider_IF( importDBConnectionFactory );

				ConfigSystemDAO_Importer configSystemDAO = ConfigSystemDAO_Importer.getInstance();
				ConfigSystemTableGetValueCommon.getInstance().setIConfigSystemTableGetValue( configSystemDAO );
			}
			
			//  TODO  Update this
			
			//////////////////////////////////////
			//////////   Do the import

			importerCoreEntryPoint = ImporterCoreEntryPoint.getInstance();
			
			int insertedSearchId = 0;

			if ( fileImportRunIdToProcess != null ) {
				//  Process Submitted Import
				insertedSearchId = 	
						ProcessFileImportSubmission.getInstance()
						.processFileImportSubmission(
								fileImportRunIdToProcess, trackingDTOTrackingRunDTOPair, importerCoreEntryPoint, importResults );
			} else {
				insertedSearchId = 
						importerCoreEntryPoint.doImport(
								projectId, 
								null,  //  userIdInsertingSearch, 
								searchNameOverrideValue, 
								importDirectoryOverrideValue, 
								mainXMLFileToImport, 
								limelightInputForImportParam, 
								scanFileFileContainer_KeyFilename,
								skipPopulatingPathOnSearchLineOptChosen
								);
				
				System.out.println( "" );
				System.out.println( "--------------------------------------" );
				System.out.println( "" );
				System.out.println( "Now: " + new Date() );
				System.out.println( "" );
				System.out.println( "Completed Limelight import for parameters:" );
				System.out.println( "project id: " + projectId );
				System.out.println( "main XML File To Import file: " 
						+ mainXMLFileToImport.getAbsolutePath() );
				if ( scanFileList == null || scanFileList.isEmpty() ) {
					System.out.println( " " );
					System.out.println( "No Scan files" );
					System.out.println( " " );
					System.out.println( " " );
				} else {
					System.out.println( " " );
					System.out.println( "Scan files full path:" );
					for ( File scanFile : scanFileList ) {
						System.out.println( scanFile.getAbsolutePath() );
					}
					System.out.println( " " );
					System.out.println( "Scan files following all soft links, full path:" );
					for ( File scanFile : scanFileList ) {
						System.out.println( scanFile.getCanonicalPath() );
					}
					System.out.println( " " );
					System.out.println( " " );
				}
				System.out.println( " " );
				System.out.println( "--------------------------------------" );
				System.out.println( " " );
			}
			
			importResults.setSearchId( insertedSearchId );

			successfulImport = true;
			importProgramShutdownThread.setNormalProgramCompletionReached( true );
			
			//  Update records for import submitted by web app
			if ( trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO() != null && trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() != null ) {
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setRunStatus( FileImportStatus.COMPLETE );
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setInsertedSearchId( insertedSearchId );
				UpdateTrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.COMPLETE, 
						trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO().getId(), 
						trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() );
				FileImportTrackingRun_Importer_RunImporter_DAO.getInstance()
				.updateInsertedSearchId( trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() );
			}

		} catch ( LimelightImporterLimelightXMLDeserializeFailException e ) {
			String exceptionMessage = e.getMessage();
			String errorMessage = "The Limelight XML File has XML structure problems and failed to parse."
					+ "  Please update the program that generated the Limelight XML File"
					+ " or ensure that the correct version is being used."
					+ "  Parse error message: " 
					+ exceptionMessage;
			//  TODO
//			if ( outputDataErrorsFileName != null ) {
//				writeDataErrorToFile( errorMessage, e, outputDataErrorsFileName );
//			}
			importResults.setImportSuccessStatus( false) ;
			importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_DATA_ERROR );
			//  Update records for import submitted by web app
			if ( trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO() != null && trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() != null ) {
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setRunStatus( FileImportStatus.FAILED );
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setRunSubStatus( FileImportRunSubStatus.DATA_ERROR );
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setDataErrorText( errorMessage );
				// TODO   Maybe populate this with something else
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setImportResultText( errorMessage );
				UpdateTrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.FAILED, 
						trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO().getId(), 
						trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() );
			}
			return importResults;  //  EARLY EXIT
			
		} catch ( LimelightImporterProjectNotAllowImportException e ) {
			// TODO
//			if ( outputDataErrorsFileName != null ) {
//				writeDataErrorToFile( 
//						"The upload can no longer be inserted into this project." + e.getMessage(), 
//						e, outputDataErrorsFileName );
//			}
			importResults.setImportSuccessStatus( false) ;
			importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_PROJECT_NOT_ALLOW_IMPORT );
			//  Update records for import submitted by web app
			if ( trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO() != null && trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() != null ) {
				String dataErrorText = "The upload can no longer be inserted into this project.";
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setRunStatus( FileImportStatus.FAILED );
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setRunSubStatus( FileImportRunSubStatus.PROJECT_NOT_ALLOW_IMPORT );
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setDataErrorText( dataErrorText );
				// TODO   Maybe populate this with something else
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setImportResultText( dataErrorText );
				UpdateTrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.FAILED, 
						trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO().getId(), 
						trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() );
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
			if ( trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO() != null && trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() != null ) {
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setRunStatus( FileImportStatus.FAILED );
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setRunSubStatus( FileImportRunSubStatus.DATA_ERROR );
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setDataErrorText( e.getMessage() );
				// TODO   Maybe populate this with something else
				trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO().setImportResultText( e.getMessage() );
				UpdateTrackingTrackingRunRecordsDBTransaction.getInstance()
				.updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
						FileImportStatus.FAILED, 
						trackingDTOTrackingRunDTOPair.getFileImportTrackingDTO().getId(), 
						trackingDTOTrackingRunDTOPair.getFileImportTrackingRunDTO() );
			}
			return importResults;  //  EARLY EXIT
			
		} catch ( Exception e ) {
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
				ImportRunImporterDBConnectionFactory.getInstance().closeAllConnections();
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
			LimelightImporterProgram.getSingletonInstance().shutdownReceivedViaShutdownHook = true;
			try {
				LimelightImporterProgram.getSingletonInstance().importerCoreEntryPoint.setShutdownRequested(true);
			} catch ( Exception e ) {
				//  Eat this exception since may be null pointer exception or other exception
			}
			if ( logImportProgramShutdownThread.isDebugEnabled() ) {
				logImportProgramShutdownThread.debug( "Calling ImportDBConnectionFactory.closeAllConnections(); on shutdown thread to ensure connections closed.");
			}
			{
				String msg = "Program termination has been requested.  Closing database connections.";
				System.out.println( msg );
				System.err.println( msg );
			}
			//  Ensure database connections get closed before program dies.
			try {
				// free up our db resources
				ImportRunImporterDBConnectionFactory.getInstance().closeAllConnections();
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
				String msg = "Program termination has been requested.  XML file has not been fully imported.  Database connections have been closed."
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
								LimelightImporterProgram.class
								.getResourceAsStream( HELP_FILE_WITH_PATH ) ) ) ) {
			String line = null;
			while ( ( line = br.readLine() ) != null )
				System.out.println( line );				
		} catch ( Exception e ) {
			System.out.println( "Error printing help." );
		}
	}

}
