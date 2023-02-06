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
	
	private static String ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_PARAMETERS = "LIMELIGHT_JAVA_EXECUTE_PARAMS";

	private static String ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION_PROGRAM__JAVA_EXECUTABLE_PARAMETERS = "LIMELIGHT_FEATURE_DETECTION_PROGRAM_JAVA_EXECUTE_PARAMS";


	private static final String NO_PROPERTIES_FILE_ERROR_MESSAGE = "No DB Connection Properties file found.";
	
	private static final String CONFIG_FILENAME = "run_importer_config_file.properties";
	
	//  Properties
	
	private static final String PROPERTY_NAME__DATABASE_CLEANUP_DISABLE = "database.cleanup.disable";
	
	private static final String PROPERTY_VALUE__TRUE__DATABASE_CLEANUP_DISABLE = "true";

	private static final String PROPERTY_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS = "wait.time.for.next.check.for.import.to.process";

	private static final String PROPERTY_NAME__JAVA_EXECUTABLE_WITH_PATH = "java.executable.with.path";
	
	private static String PROPERTY_NAME__JAVA_EXECUTABLE_PARAMETERS = "java.executable.parameters";

	//   Importer of Limelight XML and/or Scan files
	
	private static final String PROPERTY_NAME__IMPORTER_JAR_WITH_PATH = "importer.jar.with.path";
	
	private static final String PROPERTY_NAME__IMPORTER_DB_CONFIG_WITH_PATH = "importer.db.config.file.with.path";
	
	//  Feature Detection Program Importer and Run Pipeline

	private static final String PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH = "feature_detection.importer_and_run_pipeline.jar.with.path";

	private static String PROPERTY_NAME__FEATURE_DETECTION_PROGRAM_JAVA_EXECUTABLE_PARAMETERS = "feature.detection.program.java.executable.parameters";
	
	private static final String PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH = "feature_detection.importer_and_run_pipeline.db.config.file.with.path";
	
	
	public static final String PROPERTY_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH = "run.importer.pid.file.with.path";

	/**
	 * 											Actually for Run Importer and stored in same Java DTO property as prev property "run.importer.pid.file.with.path"
	 */
	public static final String PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH = "importer.pid.file.with.path";
	
	private static final String PROPERTY_NAME__LIMELIGHT_WEB_APP_BASE_URL = "limelight.web.app.base.url";
	
	private static final String PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT = "command.run.successful.import";
	private static final String PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR = "command.run.successful.import.sysout.syserr.dir";
	
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
			Properties configProps = null;
			InputStream propertiesFileAsStream = null;
			
			try {
				if ( configFileFromCommandLine != null ) {
					if ( ! configFileFromCommandLine.exists() ) {
						System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
						String msg = "Properties file not found: " + configFileFromCommandLine.getAbsolutePath();
						//					log.error( msg );
						throw new ConfigPropertiesFileErrorException( msg );
					}

					try {
						propertiesFileAsStream = new FileInputStream(configFileFromCommandLine);

					} catch ( FileNotFoundException e ) {
						System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
						String msg = "Properties file not found: " + configFileFromCommandLine.getAbsolutePath() + " exception: " + e.toString();
						//					log.error( msg, e );
						throw new ConfigPropertiesFileErrorException( msg );
					}
				} else {
					//  Get config file from class path

					ClassLoader thisClassLoader = this.getClass().getClassLoader();
					URL configFileUrlObjUrlLocal = thisClassLoader.getResource( CONFIG_FILENAME );

					if ( configFileUrlObjUrlLocal == null ) {
						System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
						String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
						//					log.error( msg );
						throw new ConfigPropertiesFileErrorException( msg );
					} else {
						if ( log.isInfoEnabled() ) {
							log.info( "Properties file '" + CONFIG_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
						}
					}

					propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();

					if ( propertiesFileAsStream == null ) {
						System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
						String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
						//					log.error( msg );
						throw new ConfigPropertiesFileErrorException( msg );
					}
				}


				configProps = new Properties();

				configProps.load(propertiesFileAsStream);

			} finally {
				
				if ( propertiesFileAsStream != null ) {
					
					propertiesFileAsStream.close();
				}
			}
			
			////////
			
			boolean databaseCleanup_Disable = false;
			{
				String databaseCleanup_Disable_PropertyValue_String = configProps.getProperty( PROPERTY_NAME__DATABASE_CLEANUP_DISABLE );
				
				if ( databaseCleanup_Disable_PropertyValue_String != null ) {
					databaseCleanup_Disable_PropertyValue_String = databaseCleanup_Disable_PropertyValue_String.trim();
				}
				
				if ( PROPERTY_VALUE__TRUE__DATABASE_CLEANUP_DISABLE.equals( databaseCleanup_Disable_PropertyValue_String ) ) {
					databaseCleanup_Disable = true;

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
			
			String waitTimeForNextCheckForImportToProcess_InSecondsString = configProps.getProperty( PROPERTY_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS );
			
			String javaExecutableWithPath = configProps.getProperty( PROPERTY_NAME__JAVA_EXECUTABLE_WITH_PATH );
			
			//											First from Environment Variables
			String javaExecutableParametersString = System.getenv( ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_PARAMETERS );

//			if ( javaExecutableParametersString != null ) {
//				System.out.println( "Environment Variable '" + ENVIRONMENT_VARIABLE_NAME__JAVA_EXECUTABLE_PARAMETERS + "' has value : " + javaExecutableParametersString );
//			}
			
			if ( javaExecutableParametersString == null ) {
				javaExecutableParametersString = configProps.getProperty( PROPERTY_NAME__JAVA_EXECUTABLE_PARAMETERS );
			}

			//											First from Environment Variables
			String featureDetectionProgram_JavaExecutableParametersString = System.getenv( ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION_PROGRAM__JAVA_EXECUTABLE_PARAMETERS );

//			if ( featureDetectionProgram_JavaExecutableParametersString != null ) {
//				System.out.println( "Environment Variable '" + ENVIRONMENT_VARIABLE_NAME__FEATURE_DETECTION_PROGRAM__JAVA_EXECUTABLE_PARAMETERS + "' has value : " + featureDetectionProgram_JavaExecutableParametersString );
//			}
			
			if ( featureDetectionProgram_JavaExecutableParametersString == null ) {
				featureDetectionProgram_JavaExecutableParametersString = configProps.getProperty( PROPERTY_NAME__FEATURE_DETECTION_PROGRAM_JAVA_EXECUTABLE_PARAMETERS );
			}

			//   Importer of Limelight XML and/or Scan files
			
			String importerJarWithPath = configProps.getProperty( PROPERTY_NAME__IMPORTER_JAR_WITH_PATH );
			String importerDbConfigWithPath = configProps.getProperty( PROPERTY_NAME__IMPORTER_DB_CONFIG_WITH_PATH );

			//  Other Importer and Run Pipeline

			String featureDetectionImporterAndPipelineRun_JarWithPath = configProps.getProperty( PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_JAR_WITH_PATH );
			String featureDetectionImporterAndPipelineRun_DbConfigWithPath = configProps.getProperty( PROPERTY_NAME__FEATURE_DETECTION__IMPORTER_AND_RUN_PIPELINE_DB_CONFIG_WITH_PATH );
			
			///////
			
			String runImporterPidFileWithPath = configProps.getProperty( PROPERTY_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH );
			
			String importerPidFileWithPath = configProps.getProperty( PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH );
			
			String limelightWebAppBaseURL = configProps.getProperty( PROPERTY_NAME__LIMELIGHT_WEB_APP_BASE_URL );
			
			String commandToRunOnSuccessfulImport = configProps.getProperty( PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT );
			String commandToRunOnSuccessfulImportSyoutSyserrDir = configProps.getProperty( PROPERTY_NAME__COMMAND_RUN_ON_SUCCESSFUL_IMPORT_SYSOUT_SYSERR_DIR );
			
			
			ImporterRunnerConfigData.setDatabaseCleanup_Disable(databaseCleanup_Disable);
			

			if ( StringUtils.isNotEmpty( waitTimeForNextCheckForImportToProcess_InSecondsString ) ) {

				int waitTimeForNextCheckForImportToProcess_InSeconds = -1;
				try {
					waitTimeForNextCheckForImportToProcess_InSeconds = Integer.parseInt( waitTimeForNextCheckForImportToProcess_InSecondsString );
				} catch (Exception e ) {
					String msg = "For config file: parameter '" 
							+ PROPERTY_NAME__WAIT_TIME_FOR_NEXT_CHECK_FOR_IMPORT_TO_PROCESS 
							+ "' is provided but is not an integer.  Value in config file: "
							+ waitTimeForNextCheckForImportToProcess_InSecondsString;
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

			if ( StringUtils.isEmpty( limelightWebAppBaseURL ) ) {

				String msg = "For config file: parameter '" + PROPERTY_NAME__LIMELIGHT_WEB_APP_BASE_URL + "' is not provided or is empty string.";
				log.warn( msg );
			}


			if ( StringUtils.isNotEmpty( javaExecutableWithPath ) ) {
				ImporterRunnerConfigData.setJavaExecutableWithPath( javaExecutableWithPath );
			}
			
			if ( StringUtils.isNotEmpty( javaExecutableParametersString ) ) {
				String[] javaExecutableParametersArray = javaExecutableParametersString.split( " " );
				List<String> javaExecutableParametersLocal = new ArrayList<>( javaExecutableParametersArray.length );
				for ( String javaExecutableParameter : javaExecutableParametersArray ) {
					if ( StringUtils.isNotEmpty(javaExecutableParameter) ) {
						javaExecutableParametersLocal.add( javaExecutableParameter );
					}
				}
				if ( ! javaExecutableParametersLocal.isEmpty() ) {
					ImporterRunnerConfigData.setJavaExecutableParameters( javaExecutableParametersLocal );
				}
			}
			

			if ( StringUtils.isNotEmpty( featureDetectionProgram_JavaExecutableParametersString ) ) {
				String[] javaExecutableParametersArray = featureDetectionProgram_JavaExecutableParametersString.split( " " );
				List<String> javaExecutableParametersLocal = new ArrayList<>( javaExecutableParametersArray.length );
				for ( String javaExecutableParameter : javaExecutableParametersArray ) {
					if ( StringUtils.isNotEmpty(javaExecutableParameter) ) {
						javaExecutableParametersLocal.add( javaExecutableParameter );
					}
				}
				if ( ! javaExecutableParametersLocal.isEmpty() ) {
					ImporterRunnerConfigData.setFeatureDetectionProgram_JavaExecutableParameters( javaExecutableParametersLocal );
				}
			}
			
			//   Importer of Limelight XML and/or Scan files
			
			ImporterRunnerConfigData.setImporterJarWithPath( importerJarWithPath );
			
			if ( StringUtils.isNotEmpty( importerDbConfigWithPath ) ) {
				ImporterRunnerConfigData.setImporterDbConfigWithPath( importerDbConfigWithPath );
			}

			//  Other Importer and Run Pipeline

			ImporterRunnerConfigData.setFeatureDetectionImporterAndPipelineRun_JarWithPath(featureDetectionImporterAndPipelineRun_JarWithPath);
			
			if ( StringUtils.isNotEmpty( featureDetectionImporterAndPipelineRun_DbConfigWithPath ) ) {
				ImporterRunnerConfigData.setFeatureDetectionImporterAndPipelineRun_DbConfigWithPath(featureDetectionImporterAndPipelineRun_DbConfigWithPath);
			}
			
			/////////////////////
			
			if ( StringUtils.isNotEmpty( importerPidFileWithPath ) ) {
				
				//  If not set, assumes that there is no pid file 
				
				ImporterRunnerConfigData.setRunImporterPidFileWithPath( importerPidFileWithPath );

				String msg = "INFO::  PID file: parameter '" + PROPERTY_NAME__IMPORTER_PID_FILE_WITH_PATH 
						+ "' is provided so deleting it when shut down using run control file.  value:  " + importerPidFileWithPath;
				log.warn( msg );
			}

			if ( StringUtils.isNotEmpty( runImporterPidFileWithPath ) ) {
				
				//  If not set, assumes that there is no pid file 
				
				ImporterRunnerConfigData.setRunImporterPidFileWithPath( runImporterPidFileWithPath );

				String msg = "INFO::  PID file: parameter '" + PROPERTY_NAME__RUN_IMPORTER_PID_FILE_WITH_PATH 
						+ "' is provided so deleting it when shut down using run control file.  value:  " + runImporterPidFileWithPath;
				log.warn( msg );
			}
			
			
			ImporterRunnerConfigData.setLimelightWebAppBaseURL( limelightWebAppBaseURL );

			if ( StringUtils.isNotEmpty( commandToRunOnSuccessfulImport ) ) {
				ImporterRunnerConfigData.setCommandToRunOnSuccessfulImport( commandToRunOnSuccessfulImport );
			}
			if ( StringUtils.isNotEmpty( commandToRunOnSuccessfulImportSyoutSyserrDir ) ) {
				ImporterRunnerConfigData.setCommandToRunOnSuccessfulImportSyoutSyserrDir( commandToRunOnSuccessfulImportSyoutSyserrDir );
			}
			
			
			
			ImporterRunnerConfigData.setConfigured(true);
			

			DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables dbConnectionParametersProviderFromPropertiesFile =
					new DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables();

			dbConnectionParametersProviderFromPropertiesFile.getConfigPropertiesFromPropertiesObj( configProps );

			dbConnectionParametersProviderFromPropertiesFile.init();

			return dbConnectionParametersProviderFromPropertiesFile;
			

		} catch ( RuntimeException e ) {

			log.error( "In init(),   Properties file '" + CONFIG_FILENAME + "', exception: " + e.toString(), e );

			throw e;
		}
		
	}

}
