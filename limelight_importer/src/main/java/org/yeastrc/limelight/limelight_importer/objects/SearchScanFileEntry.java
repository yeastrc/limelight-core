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
package org.yeastrc.limelight.limelight_importer.objects;

import java.util.ArrayList;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.ScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileImporterDTO;

/**
 * 
 *
 */
public class SearchScanFileEntry {

	private int searchScanFileId;
	
	private SearchScanFileDTO searchScanFileDTO;
	
	private List<Integer> scanNumbersFromPSMs = new ArrayList<>();
	
	//  If scan file being imported, these will eventually be populated
	private SearchScanFileImporterDTO searchScanFileImporterDTO;
	private ScanFileDTO scanFileDTO;
	
	private ScanFileFileContainer scanFileFileContainer;
	
	/**
	 * Package Private constructor
	 */
	SearchScanFileEntry() {
		
	}
	
	/**
	 * @param scanNumber
	 */
	public void addScanNumberFromPSM( int scanNumber ) {
		scanNumbersFromPSMs.add( scanNumber );
	}

	public int getSearchScanFileId() {
		return searchScanFileId;
	}

	public void setSearchScanFileId(int searchScanFileId) {
		this.searchScanFileId = searchScanFileId;
	}

	public SearchScanFileDTO getSearchScanFileDTO() {
		return searchScanFileDTO;
	}

	public void setSearchScanFileDTO(SearchScanFileDTO searchScanFileDTO) {
		this.searchScanFileDTO = searchScanFileDTO;
	}

	public SearchScanFileImporterDTO getSearchScanFileImporterDTO() {
		return searchScanFileImporterDTO;
	}

	public void setSearchScanFileImporterDTO(SearchScanFileImporterDTO searchScanFileImporterDTO) {
		this.searchScanFileImporterDTO = searchScanFileImporterDTO;
	}

	public ScanFileDTO getScanFileDTO() {
		return scanFileDTO;
	}

	public void setScanFileDTO(ScanFileDTO scanFileDTO) {
		this.scanFileDTO = scanFileDTO;
	}

	public List<Integer> getScanNumbersFromPSMs() {
		return scanNumbersFromPSMs;
	}

	public void setScanNumbersFromPSMs(List<Integer> scanNumbersFromPSMs) {
		this.scanNumbersFromPSMs = scanNumbersFromPSMs;
	}

	public ScanFileFileContainer getScanFileFileContainer() {
		return scanFileFileContainer;
	}

	public void setScanFileFileContainer(ScanFileFileContainer scanFileFileContainer) {
		this.scanFileFileContainer = scanFileFileContainer;
	}
	
}
