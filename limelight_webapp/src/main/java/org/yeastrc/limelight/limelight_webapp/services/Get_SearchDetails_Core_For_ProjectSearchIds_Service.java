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
package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchProgramsPerSearchListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher.Retrieve_Path;
import org.yeastrc.limelight.limelight_webapp.searchers_results.Search__SearchDetailsDisplay_Item;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_Core_Item;

/**
 * Data for Search Details (When Expand a Search)
 *
 */
@Component
public class Get_SearchDetails_Core_For_ProjectSearchIds_Service implements Get_SearchDetails_Core_For_ProjectSearchIds_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( Get_SearchDetails_Core_For_ProjectSearchIds_Service.class );
	
	public enum PopulatePath { YES, NO }
	
	@Autowired
	private SearchProgramsPerSearchListForSearchIdSearcherIF searchProgramsPerSearchListForSearchIdSearcher;
	
	@Autowired
	private Search__SearchDetailsDisplay_ForProjectSearchIdsSearcherIF search_PathFastaFilenameImportEndTimestamp_ForProjectSearchIdsSearcher;
	
	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException 
	 */
	@Override
	public List<SearchDetails_Core_Item> get_SearchDetails_Core_For_ProjectSearchIds( List<Integer> projectSearchIds, PopulatePath populatePath ) throws SQLException {

		Retrieve_Path retrieve_Path = Retrieve_Path.NO;
		
		if ( populatePath == PopulatePath.YES ) {
			retrieve_Path = Retrieve_Path.YES; 
		}

		List<Search__SearchDetailsDisplay_Item> search_PathFastaFilename_ItemList = 
				search_PathFastaFilenameImportEndTimestamp_ForProjectSearchIdsSearcher.getSearch_SearchDetailsDisplay_ListForProjectSearchIds( projectSearchIds, retrieve_Path );

		List<SearchDetails_Core_Item> results = new ArrayList<>( search_PathFastaFilename_ItemList.size() );
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		for ( Search__SearchDetailsDisplay_Item search_PathFastaFilename_Item : search_PathFastaFilename_ItemList ) {
			
			String formattedLoadTime = null;
			
			if ( search_PathFastaFilename_Item.getImportEndTimestamp() != null ) {
				formattedLoadTime = simpleDateFormat.format( search_PathFastaFilename_Item.getImportEndTimestamp() );
			}
			
			SearchDetails_Core_Item searchDetails_Core_Item = new SearchDetails_Core_Item();
			
			searchDetails_Core_Item.setProjectSearchId( search_PathFastaFilename_Item.getProjectSearchId() );
			
			if ( populatePath == PopulatePath.YES ) {
				searchDetails_Core_Item.setPath( search_PathFastaFilename_Item.getPath() );
			}
			searchDetails_Core_Item.setFastaFilename( search_PathFastaFilename_Item.getFastaFilename() );
			searchDetails_Core_Item.setFormattedLoadTime( formattedLoadTime );
			
			List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList =
					searchProgramsPerSearchListForSearchIdSearcher
					.getSearchProgramsPerSearchForSearchId( search_PathFastaFilename_Item.getSearchId() );
			searchDetails_Core_Item.setSearchProgramsPerSearchList( searchProgramsPerSearchList );
			
			results.add( searchDetails_Core_Item );
		}
		
		return results;
	}
}
