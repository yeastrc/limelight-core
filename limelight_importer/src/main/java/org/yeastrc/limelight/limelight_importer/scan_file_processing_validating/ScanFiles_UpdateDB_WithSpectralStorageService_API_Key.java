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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.dao.SearchScanFileDAO;
import org.yeastrc.limelight.limelight_importer.dao.SearchScanFileImporterDAO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileSourceFirstImportDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileImporterDTO;

/**
 * 
 *
 */
public class ScanFiles_UpdateDB_WithSpectralStorageService_API_Key {

	private static final Logger log = LoggerFactory.getLogger( ScanFiles_UpdateDB_WithSpectralStorageService_API_Key.class );

	private ScanFiles_UpdateDB_WithSpectralStorageService_API_Key() { }
	public static ScanFiles_UpdateDB_WithSpectralStorageService_API_Key getInstance() { return new ScanFiles_UpdateDB_WithSpectralStorageService_API_Key(); }
	
	/**
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception 
	 */
	public void updateDB_WithSpectralStorageService_API_Key( SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries ) throws Exception {

		for ( SearchScanFileEntry searchScanFileEntry : searchScanFileEntry_AllEntries.allEntries_AsList() ) {

			SearchScanFileImporterDTO searchScanFileImporterDTO = searchScanFileEntry.getSearchScanFileImporterDTO();
			
			if ( searchScanFileImporterDTO != null ) {
				
				SearchScanFileDTO searchScanFileDTO = searchScanFileEntry.getSearchScanFileDTO();
				if ( searchScanFileDTO == null ) {
					String msg = "searchScanFileEntry.getSearchScanFileDTO() == null";
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}
				
				SearchScanFileImporterDAO.getInstance()
				.updateSpectralStorageAPIKey( searchScanFileImporterDTO.getId(), searchScanFileImporterDTO.getSpectralStorageAPIKey() );
				
				ScanFileDTO scanFileDTO_ForInsert = new ScanFileDTO();
				ScanFileSourceFirstImportDTO scanFileSourceFirstImportDTO = new ScanFileSourceFirstImportDTO();
				
				scanFileDTO_ForInsert.setSpectralStorageAPIKey( searchScanFileImporterDTO.getSpectralStorageAPIKey() );
				
				scanFileSourceFirstImportDTO.setSearchScanFileId( searchScanFileDTO.getId() );
				scanFileSourceFirstImportDTO.setFilename( searchScanFileDTO.getFilename() );
				scanFileSourceFirstImportDTO.setFileSize( searchScanFileImporterDTO.getFileSize() );
				scanFileSourceFirstImportDTO.setSha1sum( searchScanFileImporterDTO.getSha1sum() );
				scanFileSourceFirstImportDTO.setCanonicalFilename_W_Path_OnSubmitMachine( searchScanFileImporterDTO.getAbsoluteFilename_W_Path_OnSubmitMachine() );
				scanFileSourceFirstImportDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( searchScanFileImporterDTO.getCanonicalFilename_W_Path_OnSubmitMachine() );
				scanFileSourceFirstImportDTO.setAwsBucketName( searchScanFileImporterDTO.getAwsBucketName() );
				scanFileSourceFirstImportDTO.setAwsObjectKey( searchScanFileImporterDTO.getAwsObjectKey() );
				
				ScanFileDTO scanFileDTO_FromInsert =
						ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded.getInstance()
						.scanFile_Insert_scan_file_tbl_AndChildren_IfNeeded( scanFileDTO_ForInsert, scanFileSourceFirstImportDTO );
				
				SearchScanFileImporterDAO.getInstance().updateScanFileId( searchScanFileImporterDTO.getId(), scanFileDTO_FromInsert.getId() );
				SearchScanFileDAO.getInstance().updateScanFileId( searchScanFileDTO.getId(), scanFileDTO_FromInsert.getId() );
				
				// Update existing objects
				
				searchScanFileDTO.setScanFileId( scanFileDTO_FromInsert.getId() );
				searchScanFileImporterDTO.setScanFileId( scanFileDTO_FromInsert.getId() );
				
				searchScanFileEntry.setScanFileDTO( scanFileDTO_FromInsert );
			}
		}
	}
	
}
