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
package org.yeastrc.limelight.limelight_importer.constants;

/**
 * 
 *
 */
public class ImporterProgramExitCodes {

	public static final int PROGRAM_EXIT_CODE_DEFAULT_NO_ERRORS_OR_WARNINGS = 0;

	public static final int PROGRAM_EXIT_CODE_HELP = 1;

	
	public static final int PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES = 2;

	public static final int PROGRAM_EXIT_CODE_INVALID_CONFIGURATION_PARAMETER_VALUES = 3;

	public static final int PROGRAM_EXIT_CODE_PROJECT_NOT_ALLOW_IMPORT = 4;
	
	/**
	 * The Limelight XML file or Scan Files contain data errors
	 */
	public static final int PROGRAM_EXIT_CODE_DATA_ERROR = 6;

	public static final int PROGRAM_EXIT_CODE_SYSTEM_ERROR = 10;
	
	public static final int PROGRAM_EXIT_CODE_IMPORTER_DATABASE_SCHEMA_VERSION_NUMBER_NOT_MATCH_DATABASE_DATABASE_SCHEMA_VERSION_NUMBER = 14;
	

	/**
	 * The importer process received a TERM or other signal that triggered the thread
	 * registered in the shutdown hook to run
	 */
	public static final int PROGRAM_EXIT_CODE_SHUTDOWN_REQUESTED_USING_PROCESS_TERM = 20;
	

}
