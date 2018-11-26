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

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchScanFileDAO;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;

/**
 * 
 *
 */
public class CreateSaveSearchScanFileEntries {

	private static final Logger log = LoggerFactory.getLogger( CreateSaveSearchScanFileEntries.class );

	private CreateSaveSearchScanFileEntries() { }
	public static CreateSaveSearchScanFileEntries getInstance() { return new CreateSaveSearchScanFileEntries(); }

	/**
	 * @param searchId
	 * @param scanFilenamesLimelightXMLInputList
	 * @return
	 * @throws Exception 
	 */
	public Map<String, SearchScanFileEntry> createSaveSearchScanFileEntries( int searchId, Set<String> scanFilenamesLimelightXMLInputList ) throws Exception {
		
		Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename = new HashMap<>();
		
		DB_Insert_SearchScanFileDAO db_Insert_SearchScanFileDAO = DB_Insert_SearchScanFileDAO.getInstance();
		
		for ( String scanFilename : scanFilenamesLimelightXMLInputList ) {

			SearchScanFileDTO searchScanFileDTO = new SearchScanFileDTO();
			searchScanFileDTO.setFilename( scanFilename );
			searchScanFileDTO.setSearchId( searchId );

			db_Insert_SearchScanFileDAO.saveToDatabase( searchScanFileDTO );

			SearchScanFileEntry searchScanFileEntry = new SearchScanFileEntry();
			searchScanFileEntry.setSearchScanFileId( searchScanFileDTO.getId() );
			searchScanFileEntry.setSearchScanFileDTO( searchScanFileDTO );

			searchScanFileEntry_KeyScanFilename.put( scanFilename, searchScanFileEntry );
		}
		
		return searchScanFileEntry_KeyScanFilename;
	}
}
