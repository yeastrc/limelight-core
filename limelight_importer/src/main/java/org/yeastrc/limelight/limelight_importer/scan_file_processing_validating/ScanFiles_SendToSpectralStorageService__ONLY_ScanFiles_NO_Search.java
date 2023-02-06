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

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface.ScanFileToSpectralStorageService_SendFile;
import org.yeastrc.limelight.limelight_importer.utils.SHA1SumCalculator;

/**
 * Send Scan files to Spectral Storage Service - When Not processing a Limelight XML file so ONLY Scan Files
 * 
 * Insert entries to table search_scan_file_importer_tbl
 *
 */
public class ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search {

	private static final Logger log = LoggerFactory.getLogger( ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search.class );

	private ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search() { }
	public static ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search getInstance() { return new ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search(); }
	
	/**
	 * 
	 *
	 */
	public static class ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result {
		
		private List<ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result_Item> result_List;

		public List<ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result_Item> getResult_List() {
			return result_List;
		}
	}

	/**
	 * 
	 *
	 */
	public static class ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result_Item {
		
		String spectralStorageProcessKey;
		ScanFileFileContainer scanFileFileContainer;
		String sha1sum;
		
		public String getSpectralStorageProcessKey() {
			return spectralStorageProcessKey;
		}
		public ScanFileFileContainer getScanFileFileContainer() {
			return scanFileFileContainer;
		}
		public String getSha1sum() {
			return sha1sum;
		}
	}
	
	/**
	 * @param scanFileFileContainer_KeyFilename
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception 
	 */
	public ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result sendScanFilesToSpectralStorageService(
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries ) throws Exception {
		
		List<ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result_Item> result_List = new ArrayList<>();
		
		for ( ScanFileFileContainer scanFileFileContainer : scanFileFileContainer_AllEntries.get_ScanFileFileContainer_List() ) {
			
			String scanFilename = scanFileFileContainer.getScanFilename();
			
			File scanFile = scanFileFileContainer.getScanFile();
			
			String sha1sum =
					SHA1SumCalculator.getInstance().getSHA1Sum( scanFile );

			//  Send the scan file to Spectral Storage Service and get back a "Process Key"
			
			String spectralStorageProcessKey = 
					ScanFileToSpectralStorageService_SendFile.getInstance()
					.sendScanFileToSpectralStorageService( scanFile );
			
			//  TODO !!!!!!!!!!!! Populate with AWS S3 info, if applicable
			
//			searchScanFileImporterDTO.setAwsBucketName(  );
//			searchScanFileImporterDTO.setAwsObjectKey(  );
			
			
			ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result_Item resultItem = new ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result_Item();
			result_List.add(resultItem);
			
			resultItem.scanFileFileContainer = scanFileFileContainer;
			resultItem.spectralStorageProcessKey = spectralStorageProcessKey;
			resultItem.sha1sum = sha1sum;
		}
		
		ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result result = new ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result();
		
		result.result_List = result_List;
		
		return result;
	}

}
