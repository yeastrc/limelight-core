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
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchProgramsPerSearchListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS;
import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path;
import org.yeastrc.limelight.limelight_webapp.searchers_results.Search__SearchDetailsDisplay_Item;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_Core_Item;

/**
 * Data for Search Details (When Expand a Search)
 *
 */
@Component
public class Get_SearchDetails_Core_For_ProjectSearchIds_Service implements Get_SearchDetails_Core_For_ProjectSearchIds_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( Get_SearchDetails_Core_For_ProjectSearchIds_Service.class );
	
	public enum Get_SearchDetails_Core_For_ProjectSearchIds_Service__PopulatePath { YES, NO }
	public enum Get_SearchDetails_Core_For_ProjectSearchIds_Service__Populate_ConverterProgram_CLI_Parameters { YES, NO }
	
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
	public List<SearchDetails_Core_Item> get_SearchDetails_Core_For_ProjectSearchIds(
			List<Integer> projectSearchIds, 
			Get_SearchDetails_Core_For_ProjectSearchIds_Service__PopulatePath populatePath,
			Get_SearchDetails_Core_For_ProjectSearchIds_Service__Populate_ConverterProgram_CLI_Parameters populate_ConverterProgram_CLI_Parameters 
			) throws SQLException {

		Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path retrieve_Path = Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path.NO;
		
		if ( populatePath == Get_SearchDetails_Core_For_ProjectSearchIds_Service__PopulatePath.YES ) {
			retrieve_Path = Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path.YES; 
		}
		
		Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS retrieve_CLI_PARAMS = Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS.NO;
		
		if ( populate_ConverterProgram_CLI_Parameters == Get_SearchDetails_Core_For_ProjectSearchIds_Service__Populate_ConverterProgram_CLI_Parameters.YES ) {
			retrieve_CLI_PARAMS = Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS.YES; 
		}

		List<Search__SearchDetailsDisplay_Item> search_PathFastaFilename_ItemList = 
				search_PathFastaFilenameImportEndTimestamp_ForProjectSearchIdsSearcher.getSearch_SearchDetailsDisplay_ListForProjectSearchIds( projectSearchIds, retrieve_Path, retrieve_CLI_PARAMS );

		List<SearchDetails_Core_Item> results = new ArrayList<>( search_PathFastaFilename_ItemList.size() );

		DateFormat dateTimeFormat = DateFormat.getDateTimeInstance( DateFormat.LONG, DateFormat.LONG );
		
		for ( Search__SearchDetailsDisplay_Item search_PathFastaFilename_Item : search_PathFastaFilename_ItemList ) {
			
			String formattedLoadTime = null;
			
			if ( search_PathFastaFilename_Item.getImportEndTimestamp() != null ) {
				formattedLoadTime = dateTimeFormat.format( search_PathFastaFilename_Item.getImportEndTimestamp() );
			}
			
			SearchDetails_Core_Item searchDetails_Core_Item = new SearchDetails_Core_Item();
			
			searchDetails_Core_Item.setProjectSearchId( search_PathFastaFilename_Item.getProjectSearchId() );
			
			if ( populatePath == Get_SearchDetails_Core_For_ProjectSearchIds_Service__PopulatePath.YES ) {
				searchDetails_Core_Item.setPath( search_PathFastaFilename_Item.getPath() );
			}
			searchDetails_Core_Item.setFastaFilename( search_PathFastaFilename_Item.getFastaFilename() );
			searchDetails_Core_Item.setFormattedLoadTime( formattedLoadTime );
			

			searchDetails_Core_Item.setConverterProgram_Name( search_PathFastaFilename_Item.getConverterProgram_Name() );
			searchDetails_Core_Item.setConverterProgram_Version( search_PathFastaFilename_Item.getConverterProgram_Version() );
			
			searchDetails_Core_Item.setConverterProgram_Pgm_URI( search_PathFastaFilename_Item.getConverterProgram_Pgm_URI() );
			if ( populate_ConverterProgram_CLI_Parameters == Get_SearchDetails_Core_For_ProjectSearchIds_Service__Populate_ConverterProgram_CLI_Parameters.YES ) {
				searchDetails_Core_Item.setConverterProgram_Pgm_Arguments( search_PathFastaFilename_Item.getConverterProgram_Pgm_Arguments() );
			}
			if ( search_PathFastaFilename_Item.getConverterProgram_ConversionDate() != null ) {
				String formatted_converterProgram_ConversionDate = dateTimeFormat.format(search_PathFastaFilename_Item.getConverterProgram_ConversionDate());
				searchDetails_Core_Item.setFormatted_converterProgram_ConversionDate(formatted_converterProgram_ConversionDate);
			}
			
			List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList =
					searchProgramsPerSearchListForSearchIdSearcher
					.getSearchProgramsPerSearchForSearchId( search_PathFastaFilename_Item.getSearchId() );
			searchDetails_Core_Item.setSearchProgramsPerSearchList( searchProgramsPerSearchList );
			
			results.add( searchDetails_Core_Item );
		}
		
		return results;
	}
}
