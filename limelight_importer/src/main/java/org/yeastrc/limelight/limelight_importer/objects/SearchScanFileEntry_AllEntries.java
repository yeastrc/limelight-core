/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;

/**
 * 
 *
 */
public class SearchScanFileEntry_AllEntries {

	private Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename = new HashMap<>();

	private Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename_NoSuffix = new HashMap<>();
	
	private List<SearchScanFileEntry> searchScanFileEntries_AsList;
	
	/**
	 * @return true if any entries
	 */
	public boolean hasAnyEntries() {
		return ! searchScanFileEntry_KeyScanFilename.isEmpty();
	}
	
	/**
	 * @return
	 */
	public List<SearchScanFileEntry> allEntries_AsList() {
		
		if ( searchScanFileEntries_AsList != null ) {
			return searchScanFileEntries_AsList;
		}
		
		List<SearchScanFileEntry> allEntries = new ArrayList<>( searchScanFileEntry_KeyScanFilename.size() );

		for ( Map.Entry<String, SearchScanFileEntry> entry : searchScanFileEntry_KeyScanFilename.entrySet() ) {

			SearchScanFileEntry searchScanFileEntry = entry.getValue();
			allEntries.add( searchScanFileEntry );
		}
		
		searchScanFileEntries_AsList = Collections.unmodifiableList( allEntries );
		
		return searchScanFileEntries_AsList;
	}
	
	/**
	 * @param searchScanFileDTO
	 */
	public void addEntry( SearchScanFileDTO searchScanFileDTO ) {
		
		searchScanFileEntries_AsList = null; // Clear since now out of date
		
		SearchScanFileEntry searchScanFileEntry = new SearchScanFileEntry();
		searchScanFileEntry.setSearchScanFileId( searchScanFileDTO.getId() );
		searchScanFileEntry.setSearchScanFileDTO( searchScanFileDTO );
		
		String scanFilename = searchScanFileDTO.getFilename();

		searchScanFileEntry_KeyScanFilename.put( scanFilename, searchScanFileEntry );
		
		String scanFilename_NoSuffix = FilenameUtils.removeExtension( scanFilename );

		searchScanFileEntry_KeyScanFilename_NoSuffix.put( scanFilename_NoSuffix, searchScanFileEntry );
	}
	
	/**
	 * @param scanFilename
	 * @return
	 */
	public SearchScanFileEntry get_From_ScanFilename( String scanFilename ) {
		
		SearchScanFileEntry entry = searchScanFileEntry_KeyScanFilename.get( scanFilename );
		return entry;
	}

	/**
	 * @param scanFilename_NoSuffix
	 * @return
	 */
	public SearchScanFileEntry get_From_ScanFilename_NoSuffix( String scanFilename_NoSuffix ) {
		
		SearchScanFileEntry entry = searchScanFileEntry_KeyScanFilename_NoSuffix.get( scanFilename_NoSuffix );
		return entry;
	}
	
	
}
