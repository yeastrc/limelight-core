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

import java.util.List;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.slf4j.Logger;

/**
 * 
 *
 */
public class PostProcess_ValidateScanNumbersForSingleScanFile {

	private static final Logger log = LoggerFactory.getLogger( PostProcess_ValidateScanNumbersForSingleScanFile.class );
		
	/**
	 * private constructor
	 */
	private PostProcess_ValidateScanNumbersForSingleScanFile(){}
	public static PostProcess_ValidateScanNumbersForSingleScanFile getInstance() {
		return new PostProcess_ValidateScanNumbersForSingleScanFile();
	}

	/**
	 * Validate that all scan numbers on PSMs are in the scan file
	 * 
	 * @param scanNumbersFromPSMs
	 * @param allScanNumbersForScanFileSet
	 * @throws LimelightImporterDataException 
	 */
	public void validateScanNumbersForSingleScanFile( 
			List<Integer> scanNumbersFromPSMs, 
			Set<Integer> allScanNumbersForScanFileSet,
			String scanFilename ) throws LimelightImporterDataException {

		for ( Integer scanNumbersFromPSM : scanNumbersFromPSMs ) {
			if ( ! allScanNumbersForScanFileSet.contains( scanNumbersFromPSM ) ) {
				String msg = "Scan Number on PSM not found in scan file.  Scan Filename: " + scanFilename;
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			}
		}
	}
}
