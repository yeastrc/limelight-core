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
package org.yeastrc.limelight.limelight_run_importer.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables;
import org.yeastrc.limelight.limelight_run_importer.exceptions.ConfigPropertiesFileErrorException;

/**
 * 
 *
 */
public class ProcessImporterRunnerConfigFileEnvironmentVariables {

	private static final Logger log = LoggerFactory.getLogger( ProcessImporterRunnerConfigFileEnvironmentVariables.class );


	//	private static final String NO_PROPERTIES_FILE_ERROR_MESSAGE = "No DB Connection Properties file found.";

	private static final String CONFIG_FILENAME = "run_importer_config_file.properties";


	//////////////////



	private static final String PROPERTY_NAME__DATABASE_CLEANUP_DISABLE = "database.cleanup.disable";
	private static String ENVIRONMENT_VARIABLE_NAME__DATABASE_CLEANUP_DISABLE = "LIMELIGHT_DATABASE_CLEANUP_DISABLE";
	private static final String PROPERTY_VALUE__TRUE__DATABASE_CLEANUP_DISABLE = "true";

	private static final String PROPERTY_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS = "wait.time.for.next.check.for.import.to.process";
	private static String ENVIRONMENT_VARIABLE_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS = "LIMELIGHT_WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS";

	private static final String PROPERTY_NAME__JAVA_EXECUTABLE_WITH_PATH = "java.executable.with.path";
	private static String ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_WITH_PATH = "LIMELIGHT_JAVA_EXECUTABLE_WITH_PATH";

	private static String PROPERTY_NAME__JAVA_EXECUTABLE_PARAMETERS = "java.executable.parameters";
	private static String ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_PARAMETERS = "LIMELIGHT_JAVA_EXECUTE_PARAMS";

	//   Importer of Limelight XML and/or Scan files

	private static final String PROPERTY_NAME__IMPORTER_JAR_WITH_PATH = "importer.jar.with.path";
	private static String ENVIRONMENT_VARIABLE_NAME__IMPORTER_JAR_WITH_PATH = "LIMELIGHT_IMPORTER_JAR_WITH_PATH";

	private static final String PROPERTY_NAME__IMPORTER_DB_CONFIG_WITH_PATH = "importer.db.config.file.with.path";
	private static String ENVIRONMENT_VARIABLE_NAME__IMPORTER_DB_CONFIG_WITH_PATH = "LIMELIGHT_IMPORTER_DB_CONFIG_WITH_PATH";

	//  Feature Detection Program Importer and Run Pipeline

	private static final String PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH = "feature_detection.importer_and_run_pipeline.jar.with.path";
	private static String ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH = "LIMELIGHT_FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH";

	private static final String PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH = "feature_detection.importer_and_run_pipeline.db.config.file.with.path";
	private static String ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH = "LIMELIGHT_FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH";

	private static String PROPERTY_NAME__FEATURE_DETECTION_PROGRAM_JAVA_EXECUTABLE_PARAMETERS = "feature.detection.program.java.executable.parameters";
	private static String ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION_PROGRAM__JAVA_EXECUTABLE_PARAMETERS = "LIMELIGHT_FEATURE_DETECTION_PROGRAM_JAVA_EXECUTE_PARAMS";



	public static final String PROPERTY_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH = "run.importer.pid.file.with.path";
	private static String ENVIRONMENT_VARIABLE_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH = "LIMELIGHT_RUN_IMPORTER_PID_FILE_WITH_PATH";

	/**
	 * 	  Actually for Run Importer and stored in same Java DTO property as prev property "run.importer.pid.file.with.path"
	 * 
	 * 				OLD so NO Environment Variable
	 */
	public static final String PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH = "importer.pid.file.with.path";



	private static final String PROPERTY_NAME__LIMELIGHT_WEB_APP_BASE_URL = "limelight.web.app.base.url";
	private static String ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_WEB_APP_BASE_URL = "LIMELIGHT_WEB_APP_BASE_URL";

	private static final String PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT = "command.run.successful.import";
	private static String ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_COMMAND_RUN_ON_SUCCESSFUL_IMPORT = "LIMELIGHT_COMMAND_RUN_ON_SUCCESSFUL_IMPORT";

	private static final String PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR = "command.run.successful.import.sysout.syserr.dir";
	private static String ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR = "LIMELIGHT_COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR";

	/**
	 * private constructor
	 */
	private ProcessImporterRunnerConfigFileEnvironmentVariables() { }

	/**
	 * @return newly created instance
	 */
	public static ProcessImporterRunnerConfigFileEnvironmentVariables getInstance() { 
		return new ProcessImporterRunnerConfigFileEnvironmentVariables(); 
	}


	/**
	 * Process the import runner config file, saving the config and 
	 * return a IDBConnectionParametersProvider object configured with DB params
	 * 
	 * 
	 * @param configFileFromCommandLine
	 * @return
	 * @throws Exception 
	 */
	public DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables processConfigFile( File configFileFromCommandLine ) throws Exception {

		try {
			Properties configProps_FromPropertiesFile = null;
			InputStream propertiesFileAsStream = null;

			try {
				if ( configFileFromCommandLine != null ) {
					if ( ! configFileFromCommandLine.exists() ) {
						//						System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
						String msg = "Properties file not found: " + configFileFromCommandLine.getAbsolutePath();
						//					log.error( msg );
						System.err.println( msg );
						throw new ConfigPropertiesFileErrorException( msg );
					}

					try {
						propertiesFileAsStream = new FileInputStream(configFileFromCommandLine);

					} catch ( FileNotFoundException e ) {
						//						System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
						String msg = "Properties file not found: " + configFileFromCommandLine.getAbsolutePath() + " exception: " + e.toString();
						//					log.error( msg, e );
						System.err.println( msg );
						throw new ConfigPropertiesFileErrorException( msg );
					}
				} else {
					//  Get config file from class path

					ClassLoader thisClassLoader = this.getClass().getClassLoader();
					URL configFileUrlObjUrlLocal = thisClassLoader.getResource( CONFIG_FILENAME );

					if ( configFileUrlObjUrlLocal == null ) {
						//						System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
						//						String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
						//						//					log.error( msg );
						//						throw new ConfigPropertiesFileErrorException( msg );
					} else {
						if ( log.isInfoEnabled() ) {
							log.info( "Properties file '" + CONFIG_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
						}
					}

					if ( configFileUrlObjUrlLocal != null ) {

						propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();

						if ( propertiesFileAsStream == null ) {
							//							System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
							String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
							//					log.error( msg );
							System.err.println( msg );
							throw new ConfigPropertiesFileErrorException( msg );
						}
					}
				}

				if ( propertiesFileAsStream != null ) {

					configProps_FromPropertiesFile = new Properties();

					configProps_FromPropertiesFile.load(propertiesFileAsStream);
				}

			} finally {

				if ( propertiesFileAsStream != null ) {

					propertiesFileAsStream.close();
				}
			}

			////////

			{

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__DATABASE_CLEANUP_DISABLE );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					if ( PROPERTY_VALUE__TRUE__DATABASE_CLEANUP_DISABLE.equals( valueFoundInLabel_String ) ) {

						ImporterRunnerConfigData.setDatabaseCleanup_Disable(true);

						log.warn( "INFO:  Environment Variable is configured so that Run Importer will NOT perform Database cleanup. Environment Variable : '" + ENVIRONMENT_VARIABLE_NAME__DATABASE_CLEANUP_DISABLE + "' with value: " + valueFoundInLabel_String );
					}
				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__DATABASE_CLEANUP_DISABLE );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( PROPERTY_VALUE__TRUE__DATABASE_CLEANUP_DISABLE.equals( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setDatabaseCleanup_Disable(true);

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__DATABASE_CLEANUP_DISABLE
									+ "' has value: '" 
									+ PROPERTY_VALUE__TRUE__DATABASE_CLEANUP_DISABLE
									+ "' " );

							log.warn( "INFO: !!!!  " );
							log.warn( "INFO: !!!!  Config file is configured so that Run Importer will NOT perform Database cleanup  !!!");
							log.warn( "INFO: !!!!  " );
						}
					}
				}
			}

			{

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {


					int waitTimeForNextCheckForImportToProcess_InSeconds = -1;
					try {
						waitTimeForNextCheckForImportToProcess_InSeconds = Integer.parseInt( valueFoundInLabel_String );
					} catch (Exception e ) {

						String msg = "INFO:  Environment Variable is provided but is not an integer. Environment Variable : '" + ENVIRONMENT_VARIABLE_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS + "' with value: " + valueFoundInLabel_String;
						log.error( msg, e );
						throw new ConfigPropertiesFileErrorException(msg);
					}

					ImporterRunnerConfigData.setWaitTimeForNextCheckForImportToProcess_InSeconds( waitTimeForNextCheckForImportToProcess_InSeconds );

					log.warn( "INFO:  Environment Variable is configured so that Run Importer will NOT perform Database cleanup. Environment Variable : '" + ENVIRONMENT_VARIABLE_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS + "' with value: " + waitTimeForNextCheckForImportToProcess_InSeconds );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}


						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							int waitTimeForNextCheckForImportToProcess_InSeconds = -1;
							try {
								waitTimeForNextCheckForImportToProcess_InSeconds = Integer.parseInt( valueFoundInLabel_String );
							} catch (Exception e ) {
								String msg = "For config file: parameter '" 
										+ PROPERTY_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS 
										+ "' is provided but is not an integer.  Value in config file: "
										+ valueFoundInLabel_String;
								log.error( msg, e );
								throw new ConfigPropertiesFileErrorException(msg);
							}

							ImporterRunnerConfigData.setWaitTimeForNextCheckForImportToProcess_InSeconds( waitTimeForNextCheckForImportToProcess_InSeconds );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS
									+ "' has value: " 
									+ waitTimeForNextCheckForImportToProcess_InSeconds
									+ " seconds" );
						}
					}
				}
			}

			{

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_WITH_PATH );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					ImporterRunnerConfigData.setJavaExecutableWithPath( valueFoundInLabel_String );

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_WITH_PATH + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__JAVA_EXECUTABLE_WITH_PATH );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setJavaExecutableWithPath( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__JAVA_EXECUTABLE_WITH_PATH
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}
			}

			{

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_PARAMETERS );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_PARAMETERS + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__JAVA_EXECUTABLE_PARAMETERS );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__JAVA_EXECUTABLE_PARAMETERS
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {
					String[] javaExecutableParametersArray = valueFoundInLabel_String.split( " " );
					List<String> javaExecutableParametersLocal = new ArrayList<>( javaExecutableParametersArray.length );
					for ( String javaExecutableParameter : javaExecutableParametersArray ) {

						if ( javaExecutableParameter != null ) {
							javaExecutableParameter = javaExecutableParameter.trim();
						}

						if ( StringUtils.isNotEmpty(javaExecutableParameter) ) {
							javaExecutableParametersLocal.add( javaExecutableParameter );
						}
					}
					if ( ! javaExecutableParametersLocal.isEmpty() ) {
						ImporterRunnerConfigData.setJavaExecutableParameters( javaExecutableParametersLocal );
					}
				}

			}

			{

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION_PROGRAM__JAVA_EXECUTABLE_PARAMETERS );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION_PROGRAM__JAVA_EXECUTABLE_PARAMETERS + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__FEATURE_DETECTION_PROGRAM_JAVA_EXECUTABLE_PARAMETERS );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setJavaExecutableWithPath( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__FEATURE_DETECTION_PROGRAM_JAVA_EXECUTABLE_PARAMETERS
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {
					String[] javaExecutableParametersArray = valueFoundInLabel_String.split( " " );
					List<String> javaExecutableParametersLocal = new ArrayList<>( javaExecutableParametersArray.length );
					for ( String javaExecutableParameter : javaExecutableParametersArray ) {

						if ( javaExecutableParameter != null ) {
							javaExecutableParameter = javaExecutableParameter.trim();
						}

						if ( StringUtils.isNotEmpty(javaExecutableParameter) ) {
							javaExecutableParametersLocal.add( javaExecutableParameter );
						}
					}
					if ( ! javaExecutableParametersLocal.isEmpty() ) {
						ImporterRunnerConfigData.setFeatureDetectionProgram_JavaExecutableParameters( javaExecutableParametersLocal );
					}
				}
			}

			{   //   Importer of Limelight XML and/or Scan files

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__IMPORTER_JAR_WITH_PATH );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					ImporterRunnerConfigData.setImporterJarWithPath( valueFoundInLabel_String );

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__IMPORTER_JAR_WITH_PATH + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__IMPORTER_JAR_WITH_PATH );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setImporterJarWithPath( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__IMPORTER_JAR_WITH_PATH
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}
			}

			{

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__IMPORTER_DB_CONFIG_WITH_PATH );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					ImporterRunnerConfigData.setImporterDbConfigWithPath( valueFoundInLabel_String );

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__IMPORTER_DB_CONFIG_WITH_PATH + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__IMPORTER_DB_CONFIG_WITH_PATH );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setImporterDbConfigWithPath( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__IMPORTER_DB_CONFIG_WITH_PATH
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}
			}

			{   //  Other Importer and Run Pipeline

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					ImporterRunnerConfigData.setFeatureDetectionImporterAndPipelineRun_JarWithPath( valueFoundInLabel_String );

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setFeatureDetectionImporterAndPipelineRun_JarWithPath( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}
			}

			{   

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					ImporterRunnerConfigData.setFeatureDetectionImporterAndPipelineRun_DbConfigWithPath( valueFoundInLabel_String );

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setFeatureDetectionImporterAndPipelineRun_DbConfigWithPath( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}
			}

			///////

			{

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					//  If not set, assumes that there is no pid file 

					ImporterRunnerConfigData.setRunImporterPidFileWithPath( valueFoundInLabel_String );

					String msg = "INFO::  PID file: Environment Variable found '" + ENVIRONMENT_VARIABLE_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH 
							+ "' is provided so deleting it when shut down using run control file.  value:  " + valueFoundInLabel_String;
					log.warn( msg );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							//  If not set, assumes that there is no pid file 

							ImporterRunnerConfigData.setRunImporterPidFileWithPath( valueFoundInLabel_String );

							String msg = "INFO::  PID file: Config file property '" + PROPERTY_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH 
									+ "' is provided so deleting it when shut down using run control file.  value:  " + valueFoundInLabel_String;
							log.warn( msg );
						}
					}
				}
			}

			{   ///  	OLD so NO Environment Variable

				//  Actually for Run Importer and stored in same Java DTO property as prev property "run.importer.pid.file.with.path"


				if ( configProps_FromPropertiesFile != null ) {

					String importerPidFileWithPath = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH );

					if ( importerPidFileWithPath != null ) {
						importerPidFileWithPath = importerPidFileWithPath.trim();
					}

					if ( StringUtils.isNotEmpty( importerPidFileWithPath ) ) {

						//  If not set, assumes that there is no pid file 

						ImporterRunnerConfigData.setRunImporterPidFileWithPath( importerPidFileWithPath );

						String msg = "INFO::  PID file: parameter '" + PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH 
								+ "' is provided so deleting it when shut down using run control file.  value:  " + importerPidFileWithPath;
						log.warn( msg );
					}

				}
			}

			///////

			{   //   WEB_APP_BASE_URL

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_WEB_APP_BASE_URL );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					ImporterRunnerConfigData.setLimelightWebAppBaseURL( valueFoundInLabel_String );

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_WEB_APP_BASE_URL + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__LIMELIGHT_WEB_APP_BASE_URL );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setLimelightWebAppBaseURL( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__LIMELIGHT_WEB_APP_BASE_URL
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}

				if ( StringUtils.isEmpty( valueFoundInLabel_String ) ) {

					String msg = "NO Value found for Environment Variable : '" + ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_WEB_APP_BASE_URL + "' OR config file property '" + PROPERTY_NAME__LIMELIGHT_WEB_APP_BASE_URL + "'.";
					log.warn( msg );
				}
			}

			{   //   COMMAND_RUN_ON_SUCCESSFUL_IMPORT

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_COMMAND_RUN_ON_SUCCESSFUL_IMPORT );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					ImporterRunnerConfigData.setCommandToRunOnSuccessfulImport( valueFoundInLabel_String );

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_COMMAND_RUN_ON_SUCCESSFUL_IMPORT + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setCommandToRunOnSuccessfulImport( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}
			}

			{   //   COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR

				String valueFoundInLabel_String = System.getenv( ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR );

				if ( valueFoundInLabel_String != null ) {
					valueFoundInLabel_String = valueFoundInLabel_String.trim();
				}

				if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

					ImporterRunnerConfigData.setCommandToRunOnSuccessfulImportSyoutSyserrDir( valueFoundInLabel_String );

					log.warn( "INFO:  Environment Variable found : '" + ENVIRONMENT_VARIABLE_NAME__LIMELIGHT_COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR + "' with value: " + valueFoundInLabel_String );

				} else {

					if ( configProps_FromPropertiesFile != null ) {

						valueFoundInLabel_String = configProps_FromPropertiesFile.getProperty( PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR );

						if ( valueFoundInLabel_String != null ) {
							valueFoundInLabel_String = valueFoundInLabel_String.trim();
						}

						if ( StringUtils.isNotEmpty( valueFoundInLabel_String ) ) {

							ImporterRunnerConfigData.setCommandToRunOnSuccessfulImportSyoutSyserrDir( valueFoundInLabel_String );

							log.warn( "INFO: Config file property '" 
									+ PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR
									+ "' has value: '" 
									+ valueFoundInLabel_String
									+ "' " );
						}
					}
				}
			}


			ImporterRunnerConfigData.setConfigured(true);


			DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables dbConnectionParametersProviderFromPropertiesFile =
					new DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables();

			dbConnectionParametersProviderFromPropertiesFile.getConfigPropertiesFromPropertiesObj( configProps_FromPropertiesFile );

			dbConnectionParametersProviderFromPropertiesFile.init();

			return dbConnectionParametersProviderFromPropertiesFile;


		} catch ( RuntimeException e ) {

			log.error( "In init(),   Properties file '" + CONFIG_FILENAME + "', exception: " + e.toString(), e );

			throw e;
		}

	}

}
