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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ScanFiles_SendToSpectralStorageService;
import org.slf4j.Logger;

/**
 * 
 *
 */
public class Process_ScanFilenames_ScanFiles {

	private static final Logger log = LoggerFactory.getLogger( Process_ScanFilenames_ScanFiles.class );

	private Process_ScanFilenames_ScanFiles() { }
	public static Process_ScanFilenames_ScanFiles getInstance() { return new Process_ScanFilenames_ScanFiles(); }

	/**
	 * @param searchId
	 * @param scanFilenamesLimelightXMLInputList
	 * @param scanFileFileContainer_KeyFilename
	 * @return
	 * @throws Exception
	 */
	public Map<String, SearchScanFileEntry>  process_ScanFilenames_ScanFiles( 
			int searchId,
			Set<String> scanFilenamesLimelightXMLInputList, 
			Map<String, ScanFileFileContainer> scanFileFileContainer_KeyFilename ) throws Exception {
		
		if ( scanFilenamesLimelightXMLInputList == null || scanFilenamesLimelightXMLInputList.isEmpty() ) {
			return null;  // EARLY RETURN
		}
		
		Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename = 
				CreateSaveSearchScanFileEntries.getInstance()
				.createSaveSearchScanFileEntries( searchId, scanFilenamesLimelightXMLInputList );
		
		if ( scanFileFileContainer_KeyFilename != null && ( ! scanFileFileContainer_KeyFilename.isEmpty() ) ) {
			
			ScanFiles_SendToSpectralStorageService.getInstance()
			.sendScanFilesToSpectralStorageService( scanFileFileContainer_KeyFilename, searchScanFileEntry_KeyScanFilename );
		}
		
		log.warn( "INFO:  !!  Finished processing Scan Files.");
		
		return searchScanFileEntry_KeyScanFilename;
	}
	
}
