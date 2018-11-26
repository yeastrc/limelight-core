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
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchScanFileImporterDAO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface.ScanFileToSpectralStorageService_SendFile;
import org.yeastrc.limelight.limelight_importer.utils.SHA1SumCalculator;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileImporterDTO;

/**
 * Send Scan files to Spectral Storage Service
 * 
 * Insert entries to table search_scan_file_importer_tbl
 *
 */
public class ScanFiles_SendToSpectralStorageService {

	private static final Logger log = LoggerFactory.getLogger( ScanFiles_SendToSpectralStorageService.class );

	private ScanFiles_SendToSpectralStorageService() { }
	public static ScanFiles_SendToSpectralStorageService getInstance() { return new ScanFiles_SendToSpectralStorageService(); }
	
	/**
	 * @param scanFileFileContainer_KeyFilename
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception 
	 */
	public void sendScanFilesToSpectralStorageService(
			Map<String, ScanFileFileContainer> scanFileFileContainer_KeyFilename,
			Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename ) throws Exception {
		
		for ( Map.Entry<String, ScanFileFileContainer> scanFileFileContainerEntry : scanFileFileContainer_KeyFilename.entrySet() ) {
			
			String scanFilename = scanFileFileContainerEntry.getKey();
			ScanFileFileContainer scanFileFileContainer = scanFileFileContainerEntry.getValue();
			
			SearchScanFileEntry searchScanFileEntry = searchScanFileEntry_KeyScanFilename.get( scanFilename );
			if ( searchScanFileEntry == null ) {
				String msg = "No entry in searchScanFileEntry_KeyScanFilename for scanFilename: " + scanFilename;
				log.error( msg );
				throw new LimelightImporterInternalException( msg );
			}
			
			File scanFile = scanFileFileContainer.getScanFile();
			
			String sha1sum =
					SHA1SumCalculator.getInstance().getSHA1Sum( scanFile );

			//  Send the scan file to Spectral Storage Service and get back a "Process Key"
			
			String spectralStorageProcessKey = 
					ScanFileToSpectralStorageService_SendFile.getInstance()
					.sendScanFileToSpectralStorageService( scanFile );
			
			SearchScanFileImporterDTO searchScanFileImporterDTO = new SearchScanFileImporterDTO();
			searchScanFileImporterDTO.setSearchScanFileId( searchScanFileEntry.getSearchScanFileId() );
			searchScanFileImporterDTO.setFileSize( scanFile.length() );
			searchScanFileImporterDTO.setSha1sum( sha1sum );
			searchScanFileImporterDTO.setSpectralStorageProcessKey( spectralStorageProcessKey );

			
			searchScanFileImporterDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( scanFile.getAbsolutePath() );
			searchScanFileImporterDTO.setCanonicalFilename_W_Path_OnSubmitMachine( scanFile.getCanonicalPath() );

			//  TODO !!!!!!!!!!!! Populate with AWS S3 info, if applicable
			
//			searchScanFileImporterDTO.setAwsBucketName(  );
//			searchScanFileImporterDTO.setAwsObjectKey(  );
			
			DB_Insert_SearchScanFileImporterDAO.getInstance().saveToDatabase( searchScanFileImporterDTO );
			
			searchScanFileEntry.setSearchScanFileImporterDTO( searchScanFileImporterDTO );
		}
		
	}

}
