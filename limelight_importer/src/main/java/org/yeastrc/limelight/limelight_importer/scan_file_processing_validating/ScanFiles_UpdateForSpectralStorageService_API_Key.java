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

import java.util.Map;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.slf4j.Logger;

/**
 * 
 *
 */
public class ScanFiles_UpdateForSpectralStorageService_API_Key {

	private static final Logger log = LoggerFactory.getLogger( ScanFiles_UpdateForSpectralStorageService_API_Key.class );

	private ScanFiles_UpdateForSpectralStorageService_API_Key() { }
	public static ScanFiles_UpdateForSpectralStorageService_API_Key getInstance() { return new ScanFiles_UpdateForSpectralStorageService_API_Key(); }
	
	/**
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception
	 */
	public void scanFiles_UpdateForSpectralStorageService_API_Key( SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries ) throws Exception {
		
		if ( searchScanFileEntry_AllEntries == null ) {
			return;  // EARLY RETURN
		}
		
		ScanFiles_Populate_SpectralStorageService_API_Key.getInstance()
		.populate_SpectralStorageService_API_Key( searchScanFileEntry_AllEntries );
		
		ScanFiles_UpdateDB_WithSpectralStorageService_API_Key.getInstance()
		.updateDB_WithSpectralStorageService_API_Key( searchScanFileEntry_AllEntries );
	}
	
	
}
