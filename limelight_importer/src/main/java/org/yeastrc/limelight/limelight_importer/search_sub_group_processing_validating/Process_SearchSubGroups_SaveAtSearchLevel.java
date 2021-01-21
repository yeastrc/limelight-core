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
package org.yeastrc.limelight.limelight_importer.search_sub_group_processing_validating;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.dao.SearchSubGroupDAO;
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;

/**
 * 
 *
 */
public class Process_SearchSubGroups_SaveAtSearchLevel {

	private static final Logger log = LoggerFactory.getLogger( Process_SearchSubGroups_SaveAtSearchLevel.class );

	private Process_SearchSubGroups_SaveAtSearchLevel() { }
	public static Process_SearchSubGroups_SaveAtSearchLevel getInstance() { return new Process_SearchSubGroups_SaveAtSearchLevel(); }

	/**
	 * @param searchSubGroupnamesLimelightXMLInputSet
	 * @return Map key is searchSubGroupname
	 * @throws Exception 
	 */
	public Map<String, SearchSubGroupDTO> process_SearchSubGroups_SaveAtSearchLevel( Set<String> searchSubGroupnamesLimelightXMLInputSet, int searchId ) throws Exception {
		
		Map<String, SearchSubGroupDTO> resultsMap_Key_searchSubGroupLabel = new HashMap<>( searchSubGroupnamesLimelightXMLInputSet.size() );
		
		if ( searchSubGroupnamesLimelightXMLInputSet.isEmpty() ) {
			return resultsMap_Key_searchSubGroupLabel;
		}
		
		SearchSubGroupDAO searchSubGroupDAO = SearchSubGroupDAO.getInstance();
		
		int searchSubGroupId = 0;
		
		for ( String searchSubGroupname : searchSubGroupnamesLimelightXMLInputSet ) {
			
			searchSubGroupId++;
			
			SearchSubGroupDTO result = new SearchSubGroupDTO();
			result.setSearchId( searchId );
			result.setSearchSubGroupId( searchSubGroupId );
			result.setSubgroupName_fromImportFile(searchSubGroupname);
			
			searchSubGroupDAO.save(result);
			resultsMap_Key_searchSubGroupLabel.put(searchSubGroupname, result );
		}
		
		return resultsMap_Key_searchSubGroupLabel;
		
	}
}
