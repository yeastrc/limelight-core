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

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface.ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;

/**
 * 
 *
 */
public class PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles {
	
	private static final Logger log = LoggerFactory.getLogger( PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles.class );
	
	private static final int SCAN_LEVEL_TO_EXCLUDE = 1;
	
	/**
	 * private constructor
	 */
	private PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles(){}
	public static PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles getInstance() {
		return new PostProcess_ValidateAllScanNumbersOnPSMsInScanFiles();
	}
	
	/**
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception
	 */
	public void validateAllScanNumbersOnPSMsInScanFiles( SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries ) throws Exception {
		
		if ( searchScanFileEntry_AllEntries == null ) {
			return; // EARLY EXIT
		}
		
		ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey scanFileToSpectralStorageService_GetAllScanNumbersForAPIKey  = 
				ScanFileToSpectralStorageService_GetAllScanNumbersForAPIKey.getInstance();
		
		for ( SearchScanFileEntry searchScanFileEntry : searchScanFileEntry_AllEntries.allEntries_AsList() ) {
			
			ScanFileDTO scanFileDTO = searchScanFileEntry.getScanFileDTO();
			
			if ( scanFileDTO == null ) {
				//  No Scan File
				continue;  // EARLY CONTINUE
			}
			SearchScanFileDTO searchScanFileDTO = searchScanFileEntry.getSearchScanFileDTO();
			if ( searchScanFileDTO == null ) {
				String msg = "searchScanFileDTO == null. scanFileDTO.getSpectralStorageAPIKey(): " + scanFileDTO.getSpectralStorageAPIKey();
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			List<Integer> scanLevelsToExclude = new ArrayList<>( 1 );
			scanLevelsToExclude.add( SCAN_LEVEL_TO_EXCLUDE );
			
			List<Integer> allScanNumbersForScanFileList =
					scanFileToSpectralStorageService_GetAllScanNumbersForAPIKey
					.getAllScanNumbersForAPIKey(
							scanFileDTO.getSpectralStorageAPIKey(), 
							null /* scanLevelsToInclude */, 
							scanLevelsToExclude );
			
			validateScanNumbersForSingleScanFile( searchScanFileEntry.getScanNumbersFromPSMs(), allScanNumbersForScanFileList, searchScanFileDTO.getFilename() );
		}
	}
	

	/**
	 * Validate that all scan numbers on PSMs are in the scan file
	 * 
	 * @param scanNumbersFromPSMs
	 * @param allScanNumbersForScanFileSet
	 * @throws LimelightImporterDataException 
	 */
	private void validateScanNumbersForSingleScanFile( 
			List<Integer> scanNumbersFromPSMs, 
			List<Integer> allScanNumbersForScanFileList,
			String scanFilename ) throws LimelightImporterDataException {
		
		Set<Integer> allScanNumbersForScanFileSet = new HashSet<>( allScanNumbersForScanFileList );
		
		for ( Integer scanNumbersFromPSM : scanNumbersFromPSMs ) {
			if ( ! allScanNumbersForScanFileSet.contains( scanNumbersFromPSM ) ) {
				
				List<Integer> allScanNumbersForScanFileListSorted_For_ErrorMessage = new ArrayList<>( allScanNumbersForScanFileSet );
				
				
				String msg_ScanNumbers = ".  NO scan numbers found in scan file, excluding scan level '" + SCAN_LEVEL_TO_EXCLUDE + "'.";
				
				if ( ! allScanNumbersForScanFileListSorted_For_ErrorMessage.isEmpty() ) {
					
					Collections.sort( allScanNumbersForScanFileListSorted_For_ErrorMessage );
					
					msg_ScanNumbers = ".  All scan numbers from scan file (Excluding scan level '" + SCAN_LEVEL_TO_EXCLUDE + "'): " + StringUtils.join( allScanNumbersForScanFileListSorted_For_ErrorMessage, ", ");
				}
				
				String msg_DataExecption = "Scan Number on PSM not found in scan file.  Scan Filename: '" 
						+ scanFilename
						+ "',  scan number on PSM: "
						+ scanNumbersFromPSM;
//				String msg_Log = 
				msg_DataExecption += msg_ScanNumbers;
				log.error( msg_DataExecption );
				throw new LimelightImporterDataException( msg_DataExecption );
			}
		}
	}
	
}
