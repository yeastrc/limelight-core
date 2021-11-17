package org.yeastrc.limelight.limelight_submit_import.program;

import jargs.gnu.CmdLineParser;
import jargs.gnu.CmdLineParser.IllegalOptionValueException;
import jargs.gnu.CmdLineParser.UnknownOptionException;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_submit_import.config.ConfigParams;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportConfigException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportReportedErrorException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportServerResponseException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportUserDataException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportUsernamePasswordFileException;
import org.yeastrc.limelight.limelight_submit_import.main.SubmitUploadMain;
import org.yeastrc.limelight.limelight_submit_import.main.SubmitUploadMain.SubmitResult;
import org.yeastrc.limelight.limelight_submit_import_client_connector.constants.Limelight_SubmitImport_Version_Constants;

/**
 * 
 *
 */
public class SubmitImportProgram {

	private static final Logger log = LoggerFactory.getLogger( SubmitImportProgram.class );

	private static final int PROGRAM_EXIT_CODE_INVALID_CONFIGURATION = 1;

	private static final int PROGRAM_EXIT_CODE_INVALID_INPUT = 2;
	
	private static final int PROGRAM_EXIT_CODE_ERROR_WITH_SERVER = 10;

	private static final int PROGRAM_EXIT_CODE_PROGRAM_PROBLEM = 99;

	private static final int PROGRAM_EXIT_CODE_HELP = 1;

	private static final String FOR_HELP_STRING = "For help, run without any parameters, -h, or --help";

	
	public static final String USER_SUBMIT_IMPORT_KEY_PARAM_STRING = "user-submit-import-key";
	
	public static final String USER_SUBMIT_IMPORT_KEY_PARAM_STRING_WITH_LEADING_DASHES_TRAILING_EQUALS = 
			"--" + USER_SUBMIT_IMPORT_KEY_PARAM_STRING + "=";
	
	
	public static final String LIST_COMMAND_LINE_PARAMS_PARAM_STRING = "list-command-line-params";
	public static final String LIST_COMMAND_LINE_PARAMS_PARAM_STRING_WITH_LEADING_DASHES =
			"--" + LIST_COMMAND_LINE_PARAMS_PARAM_STRING;

	public static final String AUTH_TEST_PARAM_STRING = "auth-test";
	public static final String AUTH_TEST_PARAM_STRING_WITH_LEADING_DASHES =
			"--" + AUTH_TEST_PARAM_STRING;
		
	/**
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		
		if ( args.length == 0 ) {
			System.out.println( "Run with '-h' to view help" );
			System.exit( 1 );
		}

		{
			boolean listCommandLineArgsToSysout = false;
			for ( String arg : args ) {
				if ( arg.startsWith( LIST_COMMAND_LINE_PARAMS_PARAM_STRING_WITH_LEADING_DASHES ) ) {

					listCommandLineArgsToSysout = true;
					break;
				}
			}

			if ( listCommandLineArgsToSysout ) {

				System.out.println( "Command Line Parameters (One Per Line) (START):" );

				for ( String arg : args ) {
					if ( arg.startsWith( USER_SUBMIT_IMPORT_KEY_PARAM_STRING_WITH_LEADING_DASHES_TRAILING_EQUALS ) ) {

						String keyValue = arg.substring( USER_SUBMIT_IMPORT_KEY_PARAM_STRING_WITH_LEADING_DASHES_TRAILING_EQUALS.length() );
						if ( keyValue.length() == 0 ) {
							System.out.println( "param '" 
									+ USER_SUBMIT_IMPORT_KEY_PARAM_STRING_WITH_LEADING_DASHES_TRAILING_EQUALS 
									+ "' provided. but with no value"  );
						} else {
							int firstXshowing = 5;
							if ( keyValue.length() < firstXshowing ) {
								firstXshowing = keyValue.length();
							}
							System.out.println( "param '" 
									+ USER_SUBMIT_IMPORT_KEY_PARAM_STRING_WITH_LEADING_DASHES_TRAILING_EQUALS 
									+ "' provided.  First " + firstXshowing + " of value: " 
									+ keyValue.substring( 0, firstXshowing ) );
						}
					} else {
						System.out.println( arg );
					}
				}
				System.out.println( "Command Line Parameters (END):" );
			}
		}
		
		String userSubmitImportProgramKeyFromCommandLine = null;

		int retryCountLimit = 0;
		
		int projectId = -1;
		String projectIdString = null;
		
		String limelightXMLFileString = null;
		
		File limelightXMLFile = null;
		
		List<File> scanFiles = null;

		try {
			CmdLineParser cmdLineParser = new CmdLineParser();

			CmdLineParser.Option limelightWebappURLFromCommandLineCommandLineOpt = cmdLineParser.addStringOption( 'Z', "limelight-web-app-url" );

			CmdLineParser.Option configFileFromCommandLineCommandLineOpt = cmdLineParser.addStringOption( 'c', "config" );

			CmdLineParser.Option retryCountLimitFromCommandLineCommandLineOpt = cmdLineParser.addStringOption( 'r', "retry-count-limit" );

			CmdLineParser.Option projectIdFromCommandLineCommandLineOpt = cmdLineParser.addStringOption( 'p', "project-id" );

			CmdLineParser.Option limelightXMLFileFromCommandLineCommandLineOpt = cmdLineParser.addStringOption( 'i', "limelight-xml-file" );

			CmdLineParser.Option scanFilesFromCommandLineCommandLineOpt = cmdLineParser.addStringOption( 's', "scan-file" );

			CmdLineParser.Option noScanFilesCommandLineOpt = cmdLineParser.addBooleanOption( 'n', "no-scan-files" );

			CmdLineParser.Option searchNameFromCommandLineCommandLineOpt = cmdLineParser.addStringOption( 'Z', "search-description" );
			CmdLineParser.Option noSearchNameCommandLineOpt = cmdLineParser.addBooleanOption( 'Z', "no-search-description" );
			CmdLineParser.Option sendSearchPathCommandLineOpt = cmdLineParser.addBooleanOption( 'Z', "send-search-path" );
			
			CmdLineParser.Option authTestCommandLineOpt = cmdLineParser.addBooleanOption( 'Z', AUTH_TEST_PARAM_STRING );
			
			//  User Submit Import Program Key - Generated in Web app
			CmdLineParser.Option userSubmitImportProgramKeyCommandLineOpt = 
					cmdLineParser.addStringOption( 'Z', USER_SUBMIT_IMPORT_KEY_PARAM_STRING );

			CmdLineParser.Option versionOpt = cmdLineParser.addBooleanOption('V', "version"); 
			
			{
				// listParamsflag_OnlyUsedAbove_Opt only here so jargs parser does not complain.  
				//    value not used below this point
				CmdLineParser.Option listParamsflag_OnlyUsedAbove_Opt = cmdLineParser.addBooleanOption('Z', LIST_COMMAND_LINE_PARAMS_PARAM_STRING );
			}
			
			CmdLineParser.Option helpOpt = cmdLineParser.addBooleanOption('h', "help"); 

			CmdLineParser.Option helpConfigurationFileCommandLineOpt = cmdLineParser.addBooleanOption( 'Z', "help-configuration-file" );
		
			// parse command line options
			try { cmdLineParser.parse(args); }
			catch (IllegalOptionValueException e) {
				System.err.println(e.getMessage());
				System.err.println( "" );
				System.err.println( FOR_HELP_STRING );
				System.exit( PROGRAM_EXIT_CODE_INVALID_INPUT );
			}
			catch (UnknownOptionException e) {
				System.err.println(e.getMessage());
				System.err.println( "" );
				System.err.println( FOR_HELP_STRING );
				System.exit( PROGRAM_EXIT_CODE_INVALID_INPUT );
			}

			{
				Boolean help = (Boolean) cmdLineParser.getOptionValue(helpOpt, Boolean.FALSE);
				if(help) {
					printHelp();
					System.exit( PROGRAM_EXIT_CODE_HELP );
				}
			}
			{
				Boolean helpConfigurationFile = (Boolean) cmdLineParser.getOptionValue(helpConfigurationFileCommandLineOpt, Boolean.FALSE);
				if(helpConfigurationFile) {
					printHelpConfigurationFile();
					System.exit( PROGRAM_EXIT_CODE_HELP );
				}
			}
			{
				Boolean version = (Boolean) cmdLineParser.getOptionValue(versionOpt, Boolean.FALSE);
				if(version) {
					System.out.println( "Version Number: " + Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );
					System.exit( PROGRAM_EXIT_CODE_HELP );
				}
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
				System.exit( PROGRAM_EXIT_CODE_INVALID_INPUT );
			}
			
			boolean authTestCommandLineOptChosen = false;
			{
				Boolean authTestCommandLineOptChosenLocal = (Boolean) cmdLineParser.getOptionValue( authTestCommandLineOpt, Boolean.FALSE);
				if ( authTestCommandLineOptChosenLocal != null && authTestCommandLineOptChosenLocal.booleanValue() ) {
					authTestCommandLineOptChosen = true;
				}
			}
			
			userSubmitImportProgramKeyFromCommandLine = (String)cmdLineParser.getOptionValue( userSubmitImportProgramKeyCommandLineOpt );
			
			if ( StringUtils.isEmpty( userSubmitImportProgramKeyFromCommandLine ) ) {
				System.err.println( "parameter --" + USER_SUBMIT_IMPORT_KEY_PARAM_STRING + "= must be populated" );
				System.err.println( "" );
				System.err.println( FOR_HELP_STRING );
				System.exit( PROGRAM_EXIT_CODE_INVALID_INPUT );
			}

			String limelightWebappURL_CommandLineString = (String)cmdLineParser.getOptionValue( limelightWebappURLFromCommandLineCommandLineOpt );
			
			String configFile = (String)cmdLineParser.getOptionValue( configFileFromCommandLineCommandLineOpt );

			if ( StringUtils.isNotEmpty( limelightWebappURL_CommandLineString ) ) {
				// Have value for limelightWebappURL_CommandLineString so no value allowed for config file
				
				if ( StringUtils.isNotEmpty( configFile ) || ConfigParams.getSingletonInstance().isConfigFileOnClassPath() ) {
					System.err.println( "paramter --limelight-web-app-url= is not allowed since a configuration file has been provided using parameter '-c' (--config=) or embedded in the executable");
					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );
					System.exit( PROGRAM_EXIT_CODE_INVALID_INPUT );
				}
			}
			

			projectIdString = (String)cmdLineParser.getOptionValue( projectIdFromCommandLineCommandLineOpt );
			
			String retryCountLimitString = (String)cmdLineParser.getOptionValue( retryCountLimitFromCommandLineCommandLineOpt );
			

			limelightXMLFileString = (String)cmdLineParser.getOptionValue( limelightXMLFileFromCommandLineCommandLineOpt );


			@SuppressWarnings("rawtypes")
			Vector inputScanFileStringVector = cmdLineParser.getOptionValues( scanFilesFromCommandLineCommandLineOpt );
			
			Boolean noScanFilesCommandLineOptChosen = (Boolean) cmdLineParser.getOptionValue( noScanFilesCommandLineOpt, Boolean.FALSE);

			if ( StringUtils.isEmpty( projectIdString ) ) {
				System.err.println( "Project id must be specified." );
				System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
			} else {
				try {
					projectId = Integer.parseInt( projectIdString );

				} catch ( Exception e ) {
					System.err.println( "Project id on command line must be an integer. Value entered: " + projectIdString );
					System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
				}
			}
			if ( StringUtils.isNotEmpty(retryCountLimitString)) {
				try {
					retryCountLimit = Integer.parseInt( retryCountLimitString );

				} catch ( Exception e ) {
					String msg = "Retry Count Limit on command line is NOT an integer.  Value entered will be ignored. Value entered: " + retryCountLimitString;
					System.err.println( msg );
					System.out.println( msg );
				}
			}
			if ( StringUtils.isEmpty(limelightXMLFileString) ) {
				if ( ! authTestCommandLineOptChosen ) {
					System.err.println( "Limelight XML file must be specified." );
					System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
				}
			} else if ( authTestCommandLineOptChosen ) {
				System.err.println( "Limelight XML file NOT ALLOWED when param " + AUTH_TEST_PARAM_STRING_WITH_LEADING_DASHES + " is passed." );
				System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
			}
			
			if ( StringUtils.isNotEmpty(limelightXMLFileString) ) {
	
				limelightXMLFile = new File( limelightXMLFileString );
	
				if( ! limelightXMLFile.exists() ) {
					System.err.println( "Could not find Limelight XML file: " + limelightXMLFile.getAbsolutePath() );
					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );
					System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
				}
			}

			if ( inputScanFileStringVector != null && ( ! inputScanFileStringVector.isEmpty() ) ) {

				if ( authTestCommandLineOptChosen ) {
					System.err.println( "Scan files NOT ALLOWED when param " + AUTH_TEST_PARAM_STRING_WITH_LEADING_DASHES + " is passed." );
					System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
				}
				
				scanFiles = new ArrayList<>();

				for ( Object inputScanFileStringObject : inputScanFileStringVector ) {

					if ( ! (  inputScanFileStringObject instanceof String ) ) {

						System.err.println( "" );
						System.err.println( "Internal ERROR:  inputScanFileStringObject is not a String object." );
						System.err.println( "" );
						System.err.println( FOR_HELP_STRING );

						System.exit(PROGRAM_EXIT_CODE_PROGRAM_PROBLEM);  //  EARLY EXIT
					}

					String inputScanFileString = (String) inputScanFileStringObject;

					if( inputScanFileString == null || inputScanFileString.equals( "" ) ) {

						System.err.println( "" );
						System.err.println( "Internal ERROR:  inputScanFileStringObject is empty or null." );
						System.err.println( "" );
						System.err.println( FOR_HELP_STRING );

						System.exit(PROGRAM_EXIT_CODE_PROGRAM_PROBLEM);  //  EARLY EXIT
					}

					File scanFile = new File( inputScanFileString );

					if( ! scanFile.exists() ) {

						System.err.println( "" );
						System.err.println( "Could not find scan file: " + scanFile.getAbsolutePath() );

						System.err.println( "" );
						System.err.println( FOR_HELP_STRING );

						System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
					}

					scanFiles.add( scanFile );
				}
			}

			String searchName = (String)cmdLineParser.getOptionValue( searchNameFromCommandLineCommandLineOpt );
			
			if ( StringUtils.isNotEmpty( searchName ) ) {

				if ( authTestCommandLineOptChosen ) {
					System.err.println( "Search Name NOT ALLOWED when param " + AUTH_TEST_PARAM_STRING_WITH_LEADING_DASHES + " is passed." );
					System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
				}
				
				if ( searchName.contains( USER_SUBMIT_IMPORT_KEY_PARAM_STRING ) ) {
					
					System.err.println( "" );
					System.err.println( "!!!!!!!!!" );
					System.err.println( "Search name cannot contain '" + USER_SUBMIT_IMPORT_KEY_PARAM_STRING + "'." );
					System.err.println( "Search Name provided: " + searchName );
					System.err.println( "!!!!!!!!!" );
					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );

					System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
				}
			}

			Boolean noSearchNameCommandLineOptChosen = (Boolean) cmdLineParser.getOptionValue( noSearchNameCommandLineOpt, Boolean.FALSE);
			Boolean sendSearchPathCommandLineOptChosen = (Boolean) cmdLineParser.getOptionValue( sendSearchPathCommandLineOpt, Boolean.FALSE);

			String baseURL = null;
			boolean submitterSameMachine = false;
			File uploadBaseDir = null;
			
			if ( StringUtils.isNotEmpty( limelightWebappURL_CommandLineString ) ) {
				// Have value for limelightWebappURL_CommandLineString so use it and not config file
				baseURL = limelightWebappURL_CommandLineString;
				
			} else {
				
				ConfigParams configParams = ConfigParams.getSingletonInstance();

				if ( StringUtils.isNotEmpty( configFile ) ) {

					File configFileCommandLine = new File( configFile );

					if ( ! configFileCommandLine.exists() ) {

						System.err.println( "config file specified on command line does not exist: " + configFileCommandLine.getAbsolutePath() );

						System.err.println( "" );
						System.err.println( FOR_HELP_STRING );

						System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
					}

					configParams.setConfigFileCommandLine( configFileCommandLine );

					configParams.readConfigParams();
				}


				baseURL = configParams.getLimelightWebAppUrl();

				submitterSameMachine = configParams.isSubmitterSameMachine();
				String uploadBaseDirString = configParams.getLimelightUploadBaseDir();

				if ( StringUtils.isNotEmpty( uploadBaseDirString ) ) {

					uploadBaseDir = new File( uploadBaseDirString );

					if ( ! uploadBaseDir.exists() ) {

						System.err.println( "Upload Base Directory in configuration does not exist: " + uploadBaseDir.getCanonicalPath() );

						System.err.println( "" );
						System.err.println( FOR_HELP_STRING );

						System.exit( PROGRAM_EXIT_CODE_INVALID_CONFIGURATION );  //  EARLY EXIT
					}
				}
			}
			
			String searchPath = null;
			
			if ( sendSearchPathCommandLineOptChosen ) {

				if ( authTestCommandLineOptChosen ) {
					System.err.println( "Send Search Path NOT ALLOWED when param " + AUTH_TEST_PARAM_STRING_WITH_LEADING_DASHES + " is passed." );
					System.exit(PROGRAM_EXIT_CODE_INVALID_INPUT);  //  EARLY EXIT
				}
				
				try {
					searchPath = limelightXMLFile.getCanonicalFile().getParentFile().getCanonicalPath();


				} catch ( Exception e ) {

					System.err.println( "System error getting path for Limelight XML file: " + limelightXMLFile.getCanonicalPath() );

					System.err.println( "" );
					System.err.println( FOR_HELP_STRING );

					System.exit( PROGRAM_EXIT_CODE_PROGRAM_PROBLEM  );  //  EARLY EXIT

				}
			}
			
			

			SubmitResult submitResult = 
					SubmitUploadMain.getInstance().submitUpload(
							
							authTestCommandLineOptChosen,
							
							submitterSameMachine, 
							baseURL,
							uploadBaseDir, 
							
							userSubmitImportProgramKeyFromCommandLine,
							
							projectId, 
							projectIdString,
							
							retryCountLimit,

							limelightXMLFile, 
							scanFiles,

							searchName,
							searchPath,
							
							noSearchNameCommandLineOptChosen,
							noScanFilesCommandLineOptChosen);
			
			
			System.exit( submitResult.getExitCode() );

			
		} catch ( LimelightSubImportUsernamePasswordFileException e ) {

			// Already reported so do not report
			
			System.out.println( "Program Failed.  See Syserr for more info.");
			System.exit( PROGRAM_EXIT_CODE_ERROR_WITH_SERVER );
			
		} catch ( LimelightSubImportReportedErrorException e ) {

			// Already reported so do not report
			
			System.out.println( "Program Failed.  See Syserr for more info.");
			System.exit( PROGRAM_EXIT_CODE_ERROR_WITH_SERVER );
						
		} catch ( LimelightSubImportUserDataException e ) {
			
			// Already reported so do nothing
			
			System.out.println( "Program Failed.  See Syserr for more info.");
			System.exit( PROGRAM_EXIT_CODE_ERROR_WITH_SERVER );

		} catch ( LimelightSubImportConfigException e ) {
			
			// Already reported so do nothing
			
			System.out.println( "Program Failed.  See Syserr for more info.");
			System.exit( PROGRAM_EXIT_CODE_ERROR_WITH_SERVER );

		} catch ( LimelightSubImportServerResponseException e ) {
			
			// Already reported so do nothing
			
			System.out.println( "Program Failed.  See Syserr for more info.");
			System.exit( PROGRAM_EXIT_CODE_ERROR_WITH_SERVER );
			
		} catch (Exception e) {

			System.out.println( "Program Failed.  See Syserr for more info.");
			log.error("Failed.", e );
			throw e;


		} finally {

		}

	}
	


	/**
	 * @throws Exception
	 */
	private static void printHelp() throws Exception {

		try( BufferedReader br = 
				new BufferedReader(
						new InputStreamReader( 
								SubmitImportProgram.class
								.getResourceAsStream( "/help_output_submit_import_pgm.txt" ) ) ) ) {

			String line = null;
			while ( ( line = br.readLine() ) != null )
				System.out.println( line );				

		} catch ( Exception e ) {
			System.out.println( "Error printing help." );
		}
	}

	/**
	 * @throws Exception
	 */
	private static void printHelpConfigurationFile() throws Exception {

		try( BufferedReader br = 
				new BufferedReader(
						new InputStreamReader( 
								SubmitImportProgram.class
								.getResourceAsStream( "/help_configuration_file.txt" ) ) ) ) {

			String line = null;
			while ( ( line = br.readLine() ) != null )
				System.out.println( line );				

		} catch ( Exception e ) {
			System.out.println( "Error printing help for configuration file." );
		}
	}

}
