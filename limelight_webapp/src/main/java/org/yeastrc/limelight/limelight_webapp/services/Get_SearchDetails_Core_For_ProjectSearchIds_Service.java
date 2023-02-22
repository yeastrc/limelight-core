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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FileObjectStore_FileType_Enum;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_ForSearch_ForSearchIdsSearcher.FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_ForSearch_ForSearchIdsSearcher.FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_ForSearch_ForSearchIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
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

	@Autowired
	private Get_SearchDetails_ProjectPage_For_ProjectSearchIds_ServiceIF get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service;

	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private FileObjectStorage_ForSearch_ForSearchIdsSearcher_IF fileObjectStorage_ForSearch_ForSearchIdsSearcher;
	
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
		
		
		//  Get FASTA File data from File Object Storage data tables to support download of FASTA file
		
		Map<Integer, FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item> fileObjectStorage_Data_Map_Key_ProjectSearchId = new HashMap<>( projectSearchIds.size() );
		
		{
			
			Map<Integer, Integer> searchId_Map_Key_ProjectSearchId = new HashMap<>( projectSearchIds.size() );
			Map<Integer, List<Integer>> projectSearchIdList_Map_Key_SearchId = new HashMap<>( projectSearchIds.size() );
			List<Integer> searchIdList = new ArrayList<>( projectSearchIds.size() );
			
			for ( Integer projectSearchId : projectSearchIds ) {
			
				Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId(projectSearchId);
				if ( searchId == null ) {
					String msg = "No searchId for projectSearchId: " + projectSearchId;
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				
				searchId_Map_Key_ProjectSearchId.put(projectSearchId, searchId);
				
				List<Integer> projectSearchIdList = projectSearchIdList_Map_Key_SearchId.get(searchId);
				if ( projectSearchIdList == null ) {
					projectSearchIdList = new ArrayList<>(3);
					projectSearchIdList_Map_Key_SearchId.put(searchId, projectSearchIdList);
				}
				projectSearchIdList.add(projectSearchId);
				
				searchIdList.add(searchId);
			}
			
			List<FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item> fileObjectStorage_ForSearch_ForSearchIds_ItemList = null;
			
			{
				List<Integer> fileTypeIds_Include = new ArrayList<>(1);
				fileTypeIds_Include.add( FileObjectStore_FileType_Enum.FASTA_FILE_TYPE.value() );  // EXCLUDE FASTA file
				
				FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams requestParams = new FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams();
				requestParams.setSearchIds(searchIdList);
				requestParams.setFileTypeIds_Include(fileTypeIds_Include);
				
				
				fileObjectStorage_ForSearch_ForSearchIds_ItemList =
					fileObjectStorage_ForSearch_ForSearchIdsSearcher
					.getFileObjectStorage_ForSearch_ForSearchIds( requestParams );
			}
			
			for ( FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item item : fileObjectStorage_ForSearch_ForSearchIds_ItemList ) {

				List<Integer> projectSearchIdList = projectSearchIdList_Map_Key_SearchId.get(item.getSearchId());
				if ( projectSearchIdList == null ) {
					String msg = "Processing DB response, projectSearchIdList_Map_Key_SearchId.get(item.getSearchId()); returned null";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				for ( Integer projectSearchId : projectSearchIdList ) {

					//  Expect only 1 projectSearchId but being safe
				
					fileObjectStorage_Data_Map_Key_ProjectSearchId.put(projectSearchId, item);
				}
			}
		}
		
		
		////////////////////////
		
		//  Main Processing

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
			

			FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item = fileObjectStorage_Data_Map_Key_ProjectSearchId.get( search_PathFastaFilename_Item.getProjectSearchId() );
			
			
			
			String formattedLoadTime = null;
			
			if ( search_PathFastaFilename_Item.getImportEndTimestamp() != null ) {
				formattedLoadTime = dateTimeFormat.format( search_PathFastaFilename_Item.getImportEndTimestamp() );
			}
			
			SearchDetails_Core_Item searchDetails_Core_Item = new SearchDetails_Core_Item();
			
			searchDetails_Core_Item.setProjectSearchId( search_PathFastaFilename_Item.getProjectSearchId() );
			
			if ( populatePath == Get_SearchDetails_Core_For_ProjectSearchIds_Service__PopulatePath.YES ) {
				searchDetails_Core_Item.setPath( search_PathFastaFilename_Item.getPath() );
			}
			
			{
				if ( fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item != null ) {
					//  YES FASTA file imported
					searchDetails_Core_Item.setFastaFile_FileObjectStorageId( fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item.getId() );
					
					searchDetails_Core_Item.setFastaFilename( fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item.getFilename_at_import() );
					
					if ( search_PathFastaFilename_Item.getFastaFilename() != null 
							&& ( 
									! search_PathFastaFilename_Item.getFastaFilename().equals( 
											fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item.getFilename_at_import() ) ) ) {

						searchDetails_Core_Item.setFastaFilename_IfLimelightXMLHasDifferentFilename(search_PathFastaFilename_Item.getFastaFilename());
					}
				} else {
					//  NO FASTA file imported
					searchDetails_Core_Item.setFastaFilename( search_PathFastaFilename_Item.getFastaFilename() );
				}
			}
			
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
