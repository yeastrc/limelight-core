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


import java.util.List;

import org.apache.log4j.Logger;

/**
 * Values from the importer runner config file
 *
 */
public class ImporterRunnerConfigData {

	private static Logger log = Logger.getLogger( ImporterRunnerConfigData.class );
	
	private static boolean databaseCleanup_Disable;
	
	private static Integer waitTimeForNextCheckForImportToProcess_InSeconds;
	
	private static String javaExecutableWithPath;
	private static List<String> javaExecutableParameters;
	

	//   Importer of Limelight XML and/or Scan files
	
	private static String importerJarWithPath;
	private static String importerDbConfigWithPath;

	//  Feature Detection Importer and Run Pipeline

	private static String featureDetectionImporterAndPipelineRun_JarWithPath;
	private static List<String> featureDetectionProgram_JavaExecutableParameters;
	
	private static String featureDetectionImporterAndPipelineRun_DbConfigWithPath;

	
	//////////////
	
	private static String importerPidFileWithPath;
	
	private static String limelightWebAppBaseURL;
	
	private static String commandToRunOnSuccessfulImport;
	private static String commandToRunOnSuccessfulImportSyoutSyserrDir;
	
	private static boolean configured = false;


	public static boolean isDatabaseCleanup_Disable() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return databaseCleanup_Disable;
	}
	public static Integer getWaitTimeForNextCheckForImportToProcess_InSeconds() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return waitTimeForNextCheckForImportToProcess_InSeconds;
	}
	public static String getImporterJarWithPath() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return importerJarWithPath;
	}
	public static String getImporterDbConfigWithPath() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return importerDbConfigWithPath;
	}
	public static String getFeatureDetectionImporterAndPipelineRun_JarWithPath() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return featureDetectionImporterAndPipelineRun_JarWithPath;
	}
	public static String getFeatureDetectionImporterAndPipelineRun_DbConfigWithPath() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return featureDetectionImporterAndPipelineRun_DbConfigWithPath;
	}
	public static String getLimelightWebAppBaseURL() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return limelightWebAppBaseURL;
	}
	public static String getCommandToRunOnSuccessfulImport() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return commandToRunOnSuccessfulImport;
	}
	public static String getCommandToRunOnSuccessfulImportSyoutSyserrDir() {
		if ( ! configured ) {
			String msg = "ImporterRunnerConfigData not configured";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		return commandToRunOnSuccessfulImportSyoutSyserrDir;
	}

	
	public static void setImporterJarWithPath(String importerJarWithPath) {
		ImporterRunnerConfigData.importerJarWithPath = importerJarWithPath;
	}

	public static void setImporterDbConfigWithPath(String importerDbConfigWithPath) {
		ImporterRunnerConfigData.importerDbConfigWithPath = importerDbConfigWithPath;
	}
	public static boolean isConfigured() {
		return configured;
	}
	public static void setConfigured(boolean configured) {
		ImporterRunnerConfigData.configured = configured;
	}
	public static String getJavaExecutableWithPath() {
		return javaExecutableWithPath;
	}
	public static void setJavaExecutableWithPath(String javaExecutableWithPath) {
		ImporterRunnerConfigData.javaExecutableWithPath = javaExecutableWithPath;
	}
	public static List<String> getJavaExecutableParameters() {
		return javaExecutableParameters;
	}
	public static void setJavaExecutableParameters(List<String> javaExecutableParameters) {
		ImporterRunnerConfigData.javaExecutableParameters = javaExecutableParameters;
	}

	
	public static void setLimelightWebAppBaseURL(String limelightWebAppBaseURL) {
		ImporterRunnerConfigData.limelightWebAppBaseURL = limelightWebAppBaseURL;
	}

	public static void setCommandToRunOnSuccessfulImport(String commandToRunOnSuccessfulImport) {
		ImporterRunnerConfigData.commandToRunOnSuccessfulImport = commandToRunOnSuccessfulImport;
	}
	public static void setCommandToRunOnSuccessfulImportSyoutSyserrDir(
			String commandToRunOnSuccessfulImportSyoutSyserrDir) {
		ImporterRunnerConfigData.commandToRunOnSuccessfulImportSyoutSyserrDir = commandToRunOnSuccessfulImportSyoutSyserrDir;
	}
	public static void setWaitTimeForNextCheckForImportToProcess_InSeconds(
			Integer waitTimeForNextCheckForImportToProcess_InSeconds) {
		ImporterRunnerConfigData.waitTimeForNextCheckForImportToProcess_InSeconds = waitTimeForNextCheckForImportToProcess_InSeconds;
	}
	public static String getRunImporterPidFileWithPath() {
		return importerPidFileWithPath;
	}
	public static void setRunImporterPidFileWithPath(String runImporterPidFileWithPath) {
		ImporterRunnerConfigData.importerPidFileWithPath = runImporterPidFileWithPath;
	}
	public static void setDatabaseCleanup_Disable(boolean databaseCleanup_Disable) {
		ImporterRunnerConfigData.databaseCleanup_Disable = databaseCleanup_Disable;
	}
	public static void setFeatureDetectionImporterAndPipelineRun_JarWithPath(String importerAndPipelineRun_JarWithPath) {
		ImporterRunnerConfigData.featureDetectionImporterAndPipelineRun_JarWithPath = importerAndPipelineRun_JarWithPath;
	}
	public static void setFeatureDetectionImporterAndPipelineRun_DbConfigWithPath(String importerAndPipelineRun_DbConfigWithPath) {
		ImporterRunnerConfigData.featureDetectionImporterAndPipelineRun_DbConfigWithPath = importerAndPipelineRun_DbConfigWithPath;
	}
	public static List<String> getFeatureDetectionProgram_JavaExecutableParameters() {
		return featureDetectionProgram_JavaExecutableParameters;
	}
	public static void setFeatureDetectionProgram_JavaExecutableParameters(
			List<String> featureDetectionProgram_JavaExecutableParameters) {
		ImporterRunnerConfigData.featureDetectionProgram_JavaExecutableParameters = featureDetectionProgram_JavaExecutableParameters;
	}

}	
