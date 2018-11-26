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
package org.yeastrc.limelight.limelight_run_importer.constants;

/**
 * 
 *
 */
public class RunImporterToImporterFilenameConstants {

	/**
	 * The file for passing data to the importer rather than using command line options
	 */
	public static final String RUN_IMPORTER_TO_IMPORTER_FILENAME_PREFIX = "runImporterToImporterData_run_id_";
	
	/**
	 * The file for passing data to the importer rather than using command line options
	 */
	public static final String RUN_IMPORTER_TO_IMPORTER_FILENAME_SUFFFIX = ".xml";

	/**
	 * The file the importer will create with data errors
	 */
	public static final String IMPORTER_OUTPUT_DATA_ERRORS_FILENAME_PREFIX = "importerOutputDataErrors_run_id_";

	/**
	 * The file the importer will create with data errors
	 */
	public static final String IMPORTER_OUTPUT_DATA_ERRORS_FILENAME_SUFFFIX = ".txt";
	
}
