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
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface.ScanFileToSpectralStorageService_GetAPIKey;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileImporterDTO;

/**
 * 
 *
 */
public class ScanFiles_Populate_SpectralStorageService_API_Key {

	private static final Logger log = LoggerFactory.getLogger( ScanFiles_Populate_SpectralStorageService_API_Key.class );

	private ScanFiles_Populate_SpectralStorageService_API_Key() { }
	public static ScanFiles_Populate_SpectralStorageService_API_Key getInstance() { return new ScanFiles_Populate_SpectralStorageService_API_Key(); }

	/**
	 * Populate searchScanFileImporterDTO.setSpectralStorageAPIKey(...) 
	 * with spectralStorageAPIKey from Spectral Storage Service
	 * 
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception
	 */
	public void populate_SpectralStorageService_API_Key( Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename ) throws Exception {
		
		ScanFileToSpectralStorageService_GetAPIKey scanFileToSpectralStorageService_GetAPIKey = ScanFileToSpectralStorageService_GetAPIKey.getInstance();
		
		for ( Map.Entry<String, SearchScanFileEntry> entry : searchScanFileEntry_KeyScanFilename.entrySet() ) {

			SearchScanFileEntry searchScanFileEntry = entry.getValue();
			SearchScanFileImporterDTO searchScanFileImporterDTO = searchScanFileEntry.getSearchScanFileImporterDTO();
			if ( searchScanFileImporterDTO != null ) {
			
				String spectralStorageProcessKey = searchScanFileImporterDTO.getSpectralStorageProcessKey();

				String spectralStorageAPIKey =
						scanFileToSpectralStorageService_GetAPIKey
						.scanFileToSpectralStorageService_GetAPIKey( spectralStorageProcessKey );
				
				searchScanFileImporterDTO.setSpectralStorageAPIKey( spectralStorageAPIKey );
			}
		}
	}
	
}
