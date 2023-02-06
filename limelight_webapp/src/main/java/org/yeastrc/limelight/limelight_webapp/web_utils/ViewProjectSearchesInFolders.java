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
package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.dao.FolderForProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.FolderProjectSearchDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderForProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderProjectSearchDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectPageSingleFolder;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchListForProjectIdSearcherIF;

/**
 * For the project page, retrieve searches and put in folders
 *
 */
@Component
public class ViewProjectSearchesInFolders implements ViewProjectSearchesInFoldersIF {

	private static final Logger log = LoggerFactory.getLogger( ViewProjectSearchesInFolders.class );

	@Autowired
	private SearchListForProjectIdSearcherIF searchListForProjectIdSearcher;

	@Autowired
	private FolderForProjectDAO_IF folderForProjectDAO_IF;

	@Autowired
	private FolderProjectSearchDAO_IF folderProjectSearchDAO_IF;
	
	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	@Override
	public ProjectPageFoldersSearches getProjectPageFoldersSearches( int projectId ) throws Exception {
		
		ProjectPageFoldersSearches projectPageFoldersSearches = new ProjectPageFoldersSearches();

		List<SearchItemMinimal> searchListDB = searchListForProjectIdSearcher.getSearchListForProjectId( projectId );
		
		if ( searchListDB.isEmpty() ) {
			//  NO Searches
			projectPageFoldersSearches.setNoSearchesFound( true );
			return projectPageFoldersSearches; //  EARLY EXIT
		}
		
		//  Have Searches
		
		projectPageFoldersSearches.setNoSearchesFound( false );
		//  Get data for Put searches into folders
		List<FolderForProjectDTO> folderForProjectList = folderForProjectDAO_IF.getFolderForProjectDTO_ForProjectId( projectId );
		List<FolderProjectSearchDTO> folderProjectSearchList = folderProjectSearchDAO_IF.getFolderProjectSearchDTO_ForProjectId( projectId );
		//  Sort folders
		Collections.sort( folderForProjectList, new Comparator<FolderForProjectDTO>() {
			@Override
			public int compare(FolderForProjectDTO o1, FolderForProjectDTO o2) {
				return o1.getDisplayOrder() - o2.getDisplayOrder();
			}
		});
		//  ProjectPageSingleFolder objects into a map keyed on folderId
		Map<Integer,ProjectPageSingleFolder> projectPageSingleFolder_KeyedFolderId_Map = new HashMap<>( folderForProjectList.size() );
		for ( FolderForProjectDTO folderForProjectItem : folderForProjectList ) {
			ProjectPageSingleFolder projectPageSingleFolder = new ProjectPageSingleFolder();
			projectPageSingleFolder.setId( folderForProjectItem.getId() );
			projectPageSingleFolder.setFolderName( folderForProjectItem.getName() );
			projectPageSingleFolder.setSearches( new ArrayList<>( searchListDB.size() ) );
			projectPageSingleFolder_KeyedFolderId_Map.put( folderForProjectItem.getId(), projectPageSingleFolder );
		}
		//  FolderProjectSearchDTO objects into a map keyed on project_search_id
		Map<Integer,FolderProjectSearchDTO> folderProjectSearchDTO_KeyedProjectSearchId_Map = new HashMap<>( folderProjectSearchList.size() );
		for ( FolderProjectSearchDTO folderProjectSearchItem : folderProjectSearchList ) {
			folderProjectSearchDTO_KeyedProjectSearchId_Map.put( folderProjectSearchItem.getProjectSearchId(), folderProjectSearchItem );
		}
		//  Put searches into folders
		//  The searches that are not in any folders
		List<SearchItemMinimal> searchesNotInAnyFolders = new ArrayList<>( searchListDB.size() );
		for ( SearchItemMinimal search : searchListDB ) {
			FolderProjectSearchDTO folderProjectSearchDTO = folderProjectSearchDTO_KeyedProjectSearchId_Map.get( search.getProjectSearchId() );
			if ( folderProjectSearchDTO == null ) {
				//  search_project Not in any folder
				searchesNotInAnyFolders.add( search );
				continue;  // EARLY CONTINUE to next list entry
			}
			ProjectPageSingleFolder projectPageSingleFolder = projectPageSingleFolder_KeyedFolderId_Map.get( folderProjectSearchDTO.getFolderId() );
			if ( projectPageSingleFolder == null ) {
				//  No folder entry for folder id.  This is an error that the database should not allow due to foreign key constraints
				//  Log this and put the search in the "NotInFolders".
				String msg = "Folder record not found for folder id: " + folderProjectSearchDTO.getFolderId();
				log.error( msg );
				searchesNotInAnyFolders.add( search );
				continue;  // EARLY CONTINUE to next list entry
			}
			projectPageSingleFolder.addSearchWrapper( search );
		}
		//  Generate list of folders
		List<ProjectPageSingleFolder> projectPageSingleFolderList = new ArrayList<>( folderForProjectList.size() );
		for ( FolderForProjectDTO folderForProjectItem : folderForProjectList ) {
			ProjectPageSingleFolder projectPageSingleFolder = projectPageSingleFolder_KeyedFolderId_Map.get( folderForProjectItem.getId() );
			if ( projectPageSingleFolder == null ) {
				String msg = "Unexpected projectPageSingleFolder_KeyedFolderId_Map.get( folderForProjectItem.getId() ); returned null";
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			sortSearchesOnDisplayOrder( projectPageSingleFolder.getSearches() );
			projectPageSingleFolderList.add( projectPageSingleFolder );
		}
		sortSearchesOnDisplayOrder( searchesNotInAnyFolders );
		projectPageFoldersSearches.setSearchesNotInFolders( searchesNotInAnyFolders );
		projectPageFoldersSearches.setFolders( projectPageSingleFolderList );
		return projectPageFoldersSearches;
	}
	
	/**
	 * @param searchWrapperList - Sort on Display order
	 */
	private void sortSearchesOnDisplayOrder( List<SearchItemMinimal> searchWrapperList ) {
		Collections.sort( searchWrapperList, new Comparator<SearchItemMinimal>() {
			@Override
			public int compare(SearchItemMinimal o1, SearchItemMinimal o2) {
				return o1.getDisplayOrder() - o2.getDisplayOrder();
			}
		});
	}

	/**
	 * The folders and searches to display on the project page
	 *
	 */
	public static class ProjectPageFoldersSearches {

		private List<SearchItemMinimal> searchesNotInFolders;
		private List<ProjectPageSingleFolder> folders;
		private boolean noSearchesFound;
		
		public List<SearchItemMinimal> getSearchesNotInFolders() {
			return searchesNotInFolders;
		}
		public void setSearchesNotInFolders(List<SearchItemMinimal> searchesNotInFolders) {
			this.searchesNotInFolders = searchesNotInFolders;
		}
		public List<ProjectPageSingleFolder> getFolders() {
			return folders;
		}
		public void setFolders(List<ProjectPageSingleFolder> folders) {
			this.folders = folders;
		}
		public boolean isNoSearchesFound() {
			return noSearchesFound;
		}
		public void setNoSearchesFound(boolean noSearchesFound) {
			this.noSearchesFound = noSearchesFound;
		}
	}
}
