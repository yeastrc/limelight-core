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
package org.yeastrc.limelight.limelight_importer.scan_file_processing_validating;

import org.yeastrc.limelight.limelight_shared.constants.ScanFilenameConstants;

/**
 * 
 *
 */
public class ValidateScanFileSuffix {
	
	/**
	 * private constructor
	 */
	private ValidateScanFileSuffix(){}
	public static ValidateScanFileSuffix getInstance() {
		return new ValidateScanFileSuffix();
	}
	
	/**
	 * validateScanFileSuffix
	 * 
	 * @param inputScanFileString
	 * @return null if no error, otherwise return the error message
	 */
	public String validateScanFileSuffix( String inputScanFileString ) {
		String errorString = null;
		if ( ! ( inputScanFileString.endsWith( ScanFilenameConstants.MZ_ML_SUFFIX ) 
				|| inputScanFileString.endsWith( ScanFilenameConstants.MZ_XML_SUFFIX ) ) ) {
			errorString =  "Scan file name must end with '"
					+ ScanFilenameConstants.MZ_ML_SUFFIX 
					+ "' or '"
					+ ScanFilenameConstants.MZ_XML_SUFFIX
					+ "' and have the correct contents to match the filename suffix.";
		}
		return errorString;
	}
}
